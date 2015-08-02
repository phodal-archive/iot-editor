var app = require('app'),
	BrowserWindow = require('browser-window'),
	Menu = require('menu'),
	runtime = require('./core/runtime'),
	appMenu = require('./core/app-menu');
var ipc = require('ipc');

require('crash-reporter').start();

// Load external modules
var mods = require('./core/modules');
mods.load(runtime);

var mainWindow = null;
var menu = null;

app.on('window-all-closed', function () {
	//if (process.platform !== 'darwin') {
	app.quit();
	//}
});

app.on('ready', function () {
	var subpy = require('child_process').spawn('python', [__dirname + 'extend/hello.py']);
	runtime.emit(runtime.events.INIT_ROUTES, appMenu);

	mainWindow = new BrowserWindow({
		width: 800,
		height: 640,
		'min-width': 800,
		'min-height': 400,
		resizable: true,
		'standard-window': false,
		'fullscreen': false,
		'frame': false
	});

	// initialize runtime reference to main window
	runtime.windowId = mainWindow.id;

	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	mainWindow.focus();

	mainWindow.on('closed', function () {
		mainWindow = null;
		subpy.kill('SIGINT');
	});

	// Dock Menu (Mac)
	if (process.platform === 'darwin') {
		var dockMenu = Menu.buildFromTemplate([
			{ label: 'New Window', click: function() { console.log('New Window'); } },
			{ label: 'New Window with Settings', submenu: [
				{ label: 'Basic' },
				{ label: 'Pro'}
			]},
			{ label: 'New Command...'}
		]);
		app.dock.setMenu(dockMenu);
	}

	// Application Menu
	runtime.emit(runtime.events.INIT_APP_MENU, appMenu);

	var template = appMenu.template;
	menu = Menu.buildFromTemplate(template);

	if (process.platform === 'darwin') {
		Menu.setApplicationMenu(menu);
	} else {
		mainWindow.setMenu(menu);
	}


	ipc.on('mqtt', function(event, arg) {
		var mqtt    = require('mqtt');
		var client  = mqtt.connect('mqtt://' + arg.mqttServer);

		client.on('connect', function () {
			client.subscribe(arg.mqttTopic);
			client.publish(arg.mqttTopic, 'Hello mqtt');
			event.returnValue = {
				connected: true
			}
		});

		client.on('message', function (topic, message) {
			//event.sender.send('synchronous-mqtt', message.toString());
			//console.log(message);
			client.end();
		});
	});
});