const EditorJS = require("@editorjs/editorjs");
const Header = require("@editorjs/header");
const CheckList = require("@editorjs/checklist");
const { ipcRenderer } = require("electron");

ipcRenderer.invoke("get-contents").then((result) => {
    const contents = result;

    const editor = new EditorJS({
        holder: "editorjs",
        tools: {
            header: Header,
            checklist: {
                class: CheckList,
                inlineToolBar: true
            }
        },
        data: contents,
        onChange: () => {
            editor.save().then((result) => {
                ipcRenderer.invoke("change-contents", result);
            });
        }
    });
});