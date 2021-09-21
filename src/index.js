const EditorJS = require("@editorjs/editorjs");
const Header = require("@editorjs/header");
const CheckList = require("@editorjs/checklist");
// const fs = require("fs");

// const content = JSON.parse(fs.readFileSync("./data/content.json", "utf8"));

const editor = new EditorJS({
    holder: "editorjs",
    tools: {
        header: Header,
        checklist: {
            class: CheckList,
            inlineToolBar: true
        }
    },
    // data: content,
    // onChange: () => {
    //     editor.save().then((result) => {
    //         fs.writeFileSync("./data/content.json", JSON.stringify(result, null, ' '));
    //     });
    // }
});