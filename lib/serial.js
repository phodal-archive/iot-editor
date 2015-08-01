//Copyright (c) 2014, Josh Marinacci
//All rights reserved.
//
//	Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are met:
//
//	* Redistributions of source code must retain the above copyright notice, this
//list of conditions and the following disclaimer.
//
//* Redistributions in binary form must reproduce the above copyright notice,
//	this list of conditions and the following disclaimer in the documentation
//and/or other materials provided with the distribution.
//
//* Neither the name of the {organization} nor the names of its
//contributors may be used to endorse or promote products derived from
//this software without specific prior written permission.
//
//	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
//FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
//	OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
var SerialPort = require('serialport').SerialPort;

var sp = null;
exports.open = function (port, rate, cb) {
	console.log('opening the serial port', port, 'at rate', rate);
	sp = new SerialPort(port, {
		baudrate: rate
	});
	sp.on('open', function () {
		console.log('port finally opened');
		sp.on('data', function (data) {
			//console.log("got some data",data.toString());
			cb(data);
		});
		sp.on('close', function (err) {
			console.log('port closed from the other end', err);
			cb(err);
		});
		sp.on('error', function (err) {
			console.log('serial port error', err);
			cb(err);
		});
	});
};

exports.close = function (port, cb) {
	console.log("closing the serial port", port);
	sp.close(function (err) {
		console.log("the port is really closed now");
		if (cb) cb();
	});
};

exports.send = function (message, cb) {
	sp.write(message + '\n', function (err, results) {
		console.log('err', err);
		console.log('results', results);
		if (cb)cb(err, results);
	});
};
