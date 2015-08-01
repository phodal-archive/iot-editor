var cm = require('codemirror');
var keyEl = document.querySelector('textarea');
var editorOpts = {
	lineNumbers: true,
	mode: 'application/lua',
	gutters: ['CodeMirror-lint-markers'],
	lintWith: cm.jsonValidator,
	viewportMargin: Infinity
};
var keyEditor = cm.fromTextArea(keyEl, editorOpts);
console.log(keyEditor);