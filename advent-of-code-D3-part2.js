'use strict';
const fs = require('fs');
const input = fs.readFileSync('inputD3.txt', 'utf8').split('\r\n');

const regexNum = RegExp(/\d+/g);

let result = 0;

for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input.length; x++) {
		let gearRatio = [];

		if (input[y][x].includes('*')) {
			if (input[y][x + 1].match(regexNum)) {
				[...input[y].matchAll(regexNum)].map((n) => {
					if (n.index === x + 1) {
						gearRatio.push(n[0]);
					}
				});
			}
			if (input[y][x - 1].match(regexNum)) {
				[...input[y].matchAll(regexNum)].map((n) => {
					if (n.index <= x - 1 && n.index >= x - 4) {
						gearRatio.push(n[0]);
					}
				});
			}
			if (
				input[y - 1][x - 1].match(regexNum) ||
				input[y - 1][x].match(regexNum) ||
				input[y - 1][x + 1].match(regexNum)
			) {
				[...input[y - 1].matchAll(regexNum)].map((n) => {
					if (n.index >= x - 3 && n.index <= x + 1) {
						gearRatio.push(n[0]);
					}
				});
			}
			if (
				input[y + 1][x - 1].match(regexNum) ||
				input[y + 1][x].match(regexNum) ||
				input[y + 1][x + 1].match(regexNum)
			) {
				[...input[y + 1].matchAll(regexNum)].map((n) => {
					if (n.index >= x - 3 && n.index <= x + 1) {
						gearRatio.push(n[0]);
					}
				});
			}
		}
		if (gearRatio.length == 2) {
			result += gearRatio[0] * gearRatio[1];
		}
	}
}
console.log(result);
