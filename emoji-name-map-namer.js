const fs = require("fs");
const path = require("path");
const emojiunicode = require("./lib/emoji-unicode");
const emojinamemap = require("./lib/datasource.json");
const emojinamemapNew = {};

const twemojiNames = fs.readdirSync("./assets-original/72x72").map(e=>path.parse(e).name);
let problems = 0;
for (const emojiName in emojinamemap) {
    const unicode = emojiunicode(emojinamemap[emojiName]);
    if (twemojiNames.includes(unicode)) {
        emojinamemapNew[emojiName] = unicode;
    } else {
        const unicode2 = emojiunicode(emojinamemap[emojiName].replace(/\uFE0F/g, ""));
        if (twemojiNames.includes(unicode2)) {
            emojinamemapNew[emojiName] = unicode2;
        } else {
            console.error(`Unicode ${emojinamemap[emojiName]} is broken! Attempted ${unicode} and ${unicode2}`);
            problems++;
        }
    }
}
console.log(`There were ${problems} errors.`);
if (problems > 0) {
    throw new Error("There were problems!");
}
fs.writeFileSync("./emoji-name-map.json", JSON.stringify(emojinamemapNew));