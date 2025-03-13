const fs = require("fs");
const emojiNameMap = require("./lib/emojibase.raw.json");
let problems = 0;
for (const name in emojiNameMap) {
    let oldName = name.split("-").map(e=>e.replace(/^0+/, "")).join("-"); // Extra parsing thing to remove extra 0's
    const newName = Array.isArray(emojiNameMap[name]) ? emojiNameMap[name][0] : emojiNameMap[name];
    if (!fs.existsSync(`./assets-original/72x72/${oldName}.png`)) {
        oldName = oldName.replace(/\-FE0F/gi, "");
    }
    try {
        fs.copyFileSync(`./assets-original/72x72/${oldName}.png`, `./assets-renamed/72x72/${newName}.png`);
        fs.copyFileSync(`./assets-original/svg/${oldName}.svg`, `./assets-renamed/svg/${newName}.svg`);
    } catch (err) {
        problems++;
        console.error(`Error: ${oldName} -> ${newName}`);
    }
}
console.log(`There were ${problems} errors.`);