console.log("about to load the serial port");
try {
	var sp = require('serialport');
} catch(e) {
	console.log("error loading serial port");
	console.log(e);
	console.log(e.stack);
}

var Util = {};

Util.listPorts = function(cb) {
	sp.list(function(err,list) {
		// format the data (workaround serialport issue on Win (&*nix?))
		list.forEach(function(port) {
			if(port.pnpId){
				var data = /^USB\\VID_([a-fA-F0-9]{4})\&PID_([a-fA-F0-9]{4})/.exec(port.pnpId);
				if(data){
					port.vendorId = port.vendorId || '0x'+data[1];
					port.productId = port.productId || '0x'+data[2];
				}
			}
		});
		cb(err,list);
	});
};
