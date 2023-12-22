'use strict';
const fs = require('fs');
const input = fs.readFileSync('inputD3.txt', 'utf8').split('\r\n');

const regexSymbols = RegExp(/[^A-Z a-z 0-9]/g);
const regexNum = RegExp(/\d+/g);
const regexFullNumberOk = RegExp(/(?<=[^A-Z a-z 0-9])\d+(?=[^A-Z a-z 0-9])/g);

let result = 0;

for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input.length; x++) {
		let gearRatio = [];
		if (input[y][x].includes('*')) {
			if (input[y][x + 1].match(regexNum)) {
				gearRatio.push(input[y].substring(x, x + 4).replace(regexSymbols, ''));
			}
			if (input[y][x - 1].match(regexNum)) {
				gearRatio.push(input[y].substring(x, x - 3).replace(regexSymbols, ''));
			}
			if (
				input[y - 1][x - 1].match(regexNum) ||
				input[y - 1][x].match(regexNum) ||
				input[y - 1][x + 1].match(regexNum)
			) {
				//-_________- #
				if (input[y - 1].substring(x - 3, x + 4).match(regexNum).length > 1) {
					console.log(input[y - 1].substring(x - 3, x + 4));
					gearRatio.push(input[y - 1].substring(x - 3, x + 4).match(regexFullNumberOk));
				} else {
					gearRatio.push(input[y - 1].substring(x - 3, x + 4).match(regexNum));
				}
			}
			if (
				input[y + 1][x - 1].match(regexNum) ||
				input[y + 1][x].match(regexNum) ||
				input[y + 1][x + 1].match(regexNum)
			) {
				if (input[y + 1].substring(x - 3, x + 4).match(regexNum).length > 1) {
					gearRatio.push(input[y + 1].substring(x - 3, x + 4).match(regexFullNumberOk));
				} else {
					gearRatio.push(input[y + 1].substring(x - 3, x + 4).match(regexNum));
				}
			}
		}
		if (gearRatio.length == 2) {
			console.log(gearRatio);
			console.log(gearRatio[0] * gearRatio[1]);
			result += gearRatio[0] * gearRatio[1];
		}
	}
}
console.log(result);
