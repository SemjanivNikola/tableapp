const FieldType = [
    { id: 1, name: "single line text", type: "text", def: "single-line-text" },
    { id: 2, name: "multiline text", type: "text", def: "multiline-text" },
    { id: 3, name: "number", type: "number", def: "number" },
    { id: 4, name: "status", type: "status", def: "status" },
    { id: 5, name: "checkbox", type: "text", def: "checkbox" },
    { id: 6, name: "select", type: "text", def: "select-input" },
    { id: 7, name: "date", type: "number", def: "date-input" },
    { id: 8, name: "email", type: "text", def: "email" },
    { id: 9, name: "duration", type: "number", def: "duration" },
    { id: 10, name: "created at", type: "number", def: "created-at" },
    { id: 11, name: "last modified at", type: "number", def: "last-modified-at" },
    { id: 12, name: "link to other table", type: "text", def: "link-to-another-table" },
];

export default Object.freeze(FieldType);
