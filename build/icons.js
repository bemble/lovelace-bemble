const glob = require("glob")
const fs = require("fs");
const { parse } = require('svg-parser');
const path = require('path');

const ICON_COLLECTION_NAME = "bemble";

const getPathData = (curNode) => {
    if(curNode.type === "element" && curNode.tagName === "path") {
        return curNode.properties.d;
    }
    for (let i = 0; i < (curNode.children || []).length; i++) {
        const path = getPathData(curNode.children[i]);
        if (path) return path;
    }
};

const build = async () => {
    const svgs = await new Promise((resolve) => {
        glob(`${__dirname}/../ressources/**/*.svg`, (er, files) => resolve(files));
    });
    const iconMap = {};
    svgs.forEach(svgFileName => {
        const svgContent = fs.readFileSync(svgFileName, {encoding: 'utf-8'});
        const svgJson = parse(svgContent);
        const iconPath = getPathData(svgJson);

        const extension = path.extname(svgFileName);
        const iconName = path.basename(svgFileName, extension);

        iconMap[iconName] = iconPath.toUpperCase();
    });

    return `const ICON_MAP = ${JSON.stringify(iconMap, null, 4)};

async function getIcon(name) {
    return { path: ICON_MAP[name] };
}

async function getIconList() {
    return Object.keys(ICON_MAP).map(i => ({ name: i }));
}

window.customIconsets = window.customIconsets || {};
window.customIconsets["${ICON_COLLECTION_NAME}"] = getIcon;

window.customIcons = window.customIcons || {};
window.customIcons["${ICON_COLLECTION_NAME}"] = { getIcon, getIconList };`;
};

module.exports = build;