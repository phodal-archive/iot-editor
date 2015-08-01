'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function createMainWindow () {
	const win = new BrowserWindow({
		width: 800,
		height: 640,
		'min-width': 800,
		'min-height': 400,
		resizable: true,
		'standard-window': false,
		'fullscreen': false,
		'frame': false
	});

	win.loadUrl(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

function onClosed() {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null;
}

// prevent window being GC'd
let mainWindow;

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', function () {
	mainWindow = createMainWindow();
	initMenu();
});

function initMenu () {
	var template = [
		{
			label: 'Iot Editor',
			submenu: [
				{
					label: 'Iot Editor',
					selector: 'orderFrontStandardAboutPanel:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Services',
					submenu: []
				},
				{
					type: 'separator'
				},
				{
					label: 'Hide Electron',
					accelerator: 'CmdOrCtrl+H',
					selector: 'hide:'
				},
				{
					label: 'Hide Others',
					accelerator: 'CmdOrCtrl+Shift+H',
					selector: 'hideOtherApplications:'
				},
				{
					label: 'Show All',
					selector: 'unhideAllApplications:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'CmdOrCtrl+Q',
					selector: 'terminate:'
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{
					label: 'Undo',
					accelerator: 'CmdOrCtrl+Z',
					selector: 'undo:'
				},
				{
					label: 'Redo',
					accelerator: 'Shift+CmdOrCtrl+Z',
					selector: 'redo:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Cut',
					accelerator: 'CmdOrCtrl+X',
					selector: 'cut:'
				},
				{
					label: 'Copy',
					accelerator: 'CmdOrCtrl+C',
					selector: 'copy:'
				},
				{
					label: 'Paste',
					accelerator: 'CmdOrCtrl+V',
					selector: 'paste:'
				},
				{
					label: 'Select All',
					accelerator: 'CmdOrCtrl+A',
					selector: 'selectAll:'
				}
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'CmdOrCtrl+R',
					click: function() { remote.getCurrentWindow().reload(); }
				},
				{
					label: 'Toggle DevTools',
					accelerator: 'Alt+CmdOrCtrl+I',
					click: function() { remote.getCurrentWindow().toggleDevTools(); }
				}
			]
		},
		{
			label: 'Window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'CmdOrCtrl+M',
					selector: 'performMiniaturize:'
				},
				{
					label: 'Close',
					accelerator: 'CmdOrCtrl+W',
					selector: 'performClose:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Bring All to Front',
					selector: 'arrangeInFront:'
				}
			]
		},
		{
			label: 'Help',
			submenu: []
		}
	];

	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}