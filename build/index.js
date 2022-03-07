const fs = require("fs");
const rimraf = require("rimraf");

const iconsBuilder = require("./icons");

(async () => {
    const outdir =`${__dirname}/../dist`;
    await new Promise((resolve, reject) => rimraf(outdir, (e) => e ? reject(e) : resolve()));

    fs.mkdirSync(outdir);

    const content = [];
    content.push(await iconsBuilder());

    fs.writeFileSync(`${outdir}/bemble.js`, content.join("\n"));
})();