const dotenv = require('dotenv').config();
const GH_TOKEN = process.env.GITHUB;
const axios = require('axios');
const FILE_SERVER = "https://jamesportfolio.jackcooper.me/";
const { fetchItchGameData } = require('itchio-metadata');
var showdown  = require('showdown')
const fs = require('fs')
async function fetchGData(gameTitle,author) {
    return new Promise(async (resolve, reject) => {
        try {
            var config = {
                method:'get',
                url:`https://${author}.itch.io/${gameTitle}/data.json`
            };
            const gData = await axios(config);
            resolve(gData.data);
        } catch (err) {
           reject(err)
        }
    })

};

function search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].path === nameKey) {
            return myArray[i];
        }
    }
}

async function getRepoContents() {
    return new Promise(async (resolve, reject) => {
        try {
            var config = {
                method: 'get',
                url: 'https://api.github.com/repos/jackcooper04/james-portfolio-files/git/trees/master?recursive=1',
                headers: {
                    'Authorization': 'Bearer ' + GH_TOKEN
                }
            };
            const response = await axios(config);
            var fileTree = response.data.tree;
            var tags = new Array();

            // Not Sent
            var games = [];

            // Sent
            var gameMeta = new Array();
            var assets = new Array();
            for (idx in fileTree) {
                var splitPath = fileTree[idx].path.split("/");

                // Exclude CNAME
                if (splitPath[0] != 'CNAME' && !splitPath[0] != 'assets_reserved') {
                    // Collect Tag Names
                    // if (!tags.includes(splitPath[0])) {
                    //     tags.push(splitPath[0])
                    // };
                    if (splitPath.length > 1 && splitPath[0] != '.gitkeep' && !games.includes(splitPath[0])) {
                        // Handle Game
                        console.log('GAME')
                        games.push(splitPath[0]);

                        var gameObj = {
                            itchio: undefined,
                            itchData:{},
                            hasGame: false,
                            gameURL: undefined,
                            desc: undefined,
                            tags: []
                        };

                        var itchioFile = fileTree.filter(obj => {
                            return obj.path === `${splitPath[0]}/itchio.txt`
                        });
                        var descFile = fileTree.filter(obj => {
                            return obj.path === `${splitPath[0]}/description.txt`
                        });
                        var hasGame = fileTree.filter(obj => {
                            return obj.path === `${splitPath[0]}/Build`
                        });
                        var hasAdditTags = fileTree.filter(obj => {
                            return obj.path === `${splitPath[0]}/tags.txt`
                        });
                        console.log(splitPath[0 ])
                        if (hasGame.length > 0) {
                            gameObj.hasGame = true;
                            gameObj.gameURL = `${FILE_SERVER}${splitPath[0]}`
                        }
                        console.log(itchioFile)

                        if (hasAdditTags.length > 0) {
                            //Extract URL
                            var config_itchFile = {
                                method: 'get',
                                url: hasAdditTags[0].url,
                                headers: {
                                    'Authorization': 'Bearer ' + GH_TOKEN
                                }
                            }
                            const fileData = (await axios(config_itchFile)).data.content.replace(/(\r\n|\n|\r)/gm, "");
                            const fileDataBuffer = new Buffer.from(fileData, 'base64').toString();
                            console.log(fileDataBuffer.split(","))
                            gameObj.tags = [...fileDataBuffer.split(",")];

                            var splitTags = fileDataBuffer.split(",");

                            for (tIdx in splitTags) {
                                if (!tags.includes(splitTags[tIdx])) {
                                    tags.push(splitTags[tIdx])
                                };
                            }
                        };
                        if (itchioFile.length > 0) {
                            //Extract URL
                            var config_itchFile = {
                                method: 'get',
                                url: itchioFile[0].url,
                                headers: {
                                    'Authorization': 'Bearer ' + GH_TOKEN
                                }
                            }
                            const fileData = (await axios(config_itchFile)).data.content.replace(/(\r\n|\n|\r)/gm, "");
                            const fileDataBuffer = new Buffer.from(fileData, 'base64').toString();
                            if (fileDataBuffer.includes("github")) {
                                gameObj.itchio = fileDataBuffer; 
                                gameObj.itchData.cover_image = `https://github.com/${fileDataBuffer.split("/")[3]}.png`;
                                gameObj.itchData.title = fileDataBuffer.split("/")[4]
                            } else {
                                var splitURL = fileDataBuffer.split("/");
                                var userURL = splitURL[2].split(".itch.io")[0];
                                var gameName = splitURL[3]
                                const gameData = await fetchGData(gameName,userURL);
                                gameObj.itchData = gameData;
                                gameObj.tags = [...gameObj.tags];
                                // for (tIdx in gameData.tags) {
                                //     if (!tags.includes(gameData.tags[tIdx])) {
                                //         tags.push(gameData.tags[tIdx])
                                //     };
                                // }
                                gameObj.itchio = fileDataBuffer;    
                            }
                          
                        };

                        if (descFile.length > 0) {
                            //Extract URL
                            var config_itchFile = {
                                method: 'get',
                                url: descFile[0].url,
                                headers: {
                                    'Authorization': 'Bearer ' + GH_TOKEN
                                }
                            }
                            const fileData = (await axios(config_itchFile)).data.content.replace(/(\r\n|\n|\r)/gm, "");
                            const fileDataBuffer = new Buffer.from(fileData, 'base64').toString();
                            gameObj.desc = fileDataBuffer;
                        };
                        gameMeta.push(gameObj);
                    }


                }
            };
            var returnObj = {
                games: gameMeta,
                tags: tags,
                assets:assets
            };
            resolve(returnObj);
        } catch (err) {
            reject(err)
        }

    })
};


async function processBlog() {
    return new Promise(async (resolve, reject) => {
        var config = {
            method:'get',
            url:`${FILE_SERVER}/assets_reserved/blog/posts.json`
        };
        var posterConfig = {
            method:'get',
            url:`${FILE_SERVER}/assets_reserved/blog/users.json`
        };
        const response = await axios(config);
        const uResponse = await axios(posterConfig);
        var users = uResponse.data;
        var posts = response.data;
        for (idx in posts) {
            converter = new showdown.Converter(),
            posts[idx].author = users[posts[idx].author];
            posts[idx].message = converter.makeHtml(posts[idx].message).replace(/\n/g, "<br />");
        };
        resolve(posts);
    })

}

module.exports = {getRepoContents,processBlog};

