const EditorJS = require("@editorjs/editorjs");
const Header = require("@editorjs/header");
const NestedList = require("@editorjs/nested-list");
const CheckList = require("@editorjs/checklist");
const Code = require("@editorjs/code");
const InlineCode = require("@editorjs/inline-code");
const Link = require("@editorjs/link");
const Delimiter = require("@editorjs/delimiter");
const Marker = require("@editorjs/marker");
const Underline = require("@editorjs/underline");
const Warning = require("@editorjs/warning");
const SimpleImage = require("@editorjs/simple-image");
const Table = require("@editorjs/table");
const { ipcRenderer } = require("electron");

ipcRenderer.invoke("get-contents").then((result) => {
    const contents = result;

    const InlineTools = ["inlineCode", "quote", "link", "marker", "underline"];

    const editor = new EditorJS({
        holder: "editorjs",
        tools: {
            header: Header,
            list: {
                class: NestedList,
                inlineToolBar: InlineTools
            },
            checklist: {
                class: CheckList,
                inlineToolBar: InlineTools
            },
            code: {
                class: Code,
                inlineToolBar: InlineTools
            },
            inlinecode: InlineCode,
            link: Link,
            delimiter: Delimiter,
            marker: Marker,
            underline: Underline,
            warning: {
                class: Warning,
                inlineToolBar: InlineTools
            },
            simpleimage: SimpleImage,
            table: Table
        },
        data: contents,
        onChange: () => {
            editor.save().then((result) => {
                ipcRenderer.invoke("change-contents", result);
            });
        }
    });
});