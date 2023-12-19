'use strict';
const fs = require('fs');
const input = fs.readFileSync('inputD3.txt', 'utf8').split('\r\n');

const regexSymbols = RegExp(/[^A-Z a-z . 0-9]/g);
const regexNum = RegExp(/\d+/g);

//sum of the part numbers
let result = 0;

function findNumbers(l) {
	let numbersIndex = [];
	const numbersFound = [...l.matchAll(regexNum)];
	if (!numbersFound.length == 0) {
		numbersFound.map((n) => {
			numbersIndex.push({ index: n.index, number: parseInt(n[0]), length: n[0].length });
		});
	}
	return numbersIndex;
}

function checkForSymbols(line, prevLine, nextLine, number) {
	for (let i = number.index - 1; i <= number.index + number.length; i++) {
		console.log(i);

		if (prevLine == undefined) {
			return nextLine[i].match(regexSymbols) || line[i].match(regexSymbols);
		} else if (nextLine == undefined) {
			return prevLine[i].match(regexSymbols) || line[i].match(regexSymbols);
		} else if (prevLine !== undefined && nextLine !== undefined) {
			prevLine[i].match(regexSymbols) ||
				nextLine[i].match(regexSymbols) ||
				line[i].match(regexSymbols);
		}
	}
}

for (let y = 0; y < input.length; y++) {
	let numbers = findNumbers(input[y]);

	numbers.forEach((number) => {
		let isAValidPart = false;

		if (number.index !== 0 && number.index + number.length !== input[y].length - 1) {
			for (let x = number.index - 1; x < number.index + number.length + 1; x++) {
				if (input[y][x].match(regexSymbols) != null) {
					isAValidPart = true;
				}
			}
		}

		console.log(number.number + ' ' + isAValidPart);
	});
}
// console.log(regexSymbols.test(input[1][46]));
