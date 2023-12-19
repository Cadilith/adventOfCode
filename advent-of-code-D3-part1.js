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

for (let y = 0; y < input.length; y++) {
	let numbers = findNumbers(input[y]);

	numbers.forEach((number) => {
		let isAValidPart = false;

		//first digit case
		if (number.index == 0) {
			for (let x = number.index; x < number.index + number.length + 1; x++) {
				//same line check for symbols
				if (input[y][x].match(regexSymbols) != null) {
					isAValidPart = true;
				}
				//previous line if there is one
				if (y != 0 && input[y - 1][x].match(regexSymbols) != null) {
					isAValidPart = true;
				}
				//next line if there is one
				if (y != input.length - 1 && input[y + 1][x].match(regexSymbols) != null) {
					isAValidPart = true;
				}
			}
		}
		//last digit case
		else if (number.index + number.length === input[y].length) {
			for (let x = number.index - 1; x < number.index + number.length; x++) {
				//same line check for symbols
				if (input[y][x].match(regexSymbols) != null) {
					isAValidPart = true;
				}
				//previous line if there is one
				else if (y != 0 && input[y - 1][x].match(regexSymbols) != null) {
					isAValidPart = true;
				}
				//next line if there is one
				else if (y != input.length - 1 && input[y + 1][x].match(regexSymbols) != null) {
					isAValidPart = true;
				}
			}
		}

		//not first or last digit
		else {
			for (let x = number.index - 1; x < number.index + number.length + 1; x++) {
				//same line check for symbols
				if (input[y][x].match(regexSymbols) !== null) {
					isAValidPart = true;
				}
				//previous line if there is one
				if (y !== 0 && input[y - 1][x].match(regexSymbols) !== null) {
					isAValidPart = true;
				}
				//next line if there is one
				if (y !== input.length - 1 && input[y + 1][x].match(regexSymbols) !== null) {
					isAValidPart = true;
				}
			}
		}

		if (isAValidPart === true) {
			result += number.number;
		}
	});
}
console.log(`result : ${result}`);
