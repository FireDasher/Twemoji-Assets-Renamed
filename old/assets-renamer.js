const fs = require("fs");
const path = require("path");
const emojiNameMap = require("./emoji-name-map.json");
for (const newName in emojiNameMap) {
    const oldName = emojiNameMap[newName];
    fs.copyFileSync(`../assets-original/72x72/${oldName}.png`, `../assets-renamed/72x72/${newName}.png`);
    fs.copyFileSync(`../assets-original/svg/${oldName}.svg`, `../assets-renamed/svg/${newName}.svg`);
    
    /* old debugging thing
    if (!fs.existsSync(`./72x72/${emojiNameMap[emojiName]}.png`)) {
        console.error(emojiName + " does not exist!!! tried " + emojiNameMap[emojiName]);
    }
    */
}