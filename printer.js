#!/usr/bin/env node

var mqtt = require('mqtt');

var host = 'mqtt';
var mqtt_client = mqtt.connect( 'mqtt://' + host );

var exec = require('child_process').exec;
var cmd = 'hp-info -i';

var data = [];

exec(cmd, function(error, stdout, stderr) {
	var results = stdout.split('\n');
	for (var n in results) {
		var line = results[n].match(/\S+/g);
		if (line !== null) {
			data[line[0]] = line[1];
		}
	}
	mqtt_client.publish('home/printer/ink/black/level', data['agent1-level'], {retain: true, qos: 1});
	mqtt_client.publish('home/printer/ink/color/level', data['agent2-level'], {retain: true, qos: 1});
	process.exit();
});
