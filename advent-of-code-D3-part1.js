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
	for (let i = number.index - 1; i <= number.index + number.length + 1; i++) {
		return (
			prevLine[i].includes(regexSymbols) ||
			nextLine[i].includes(regexSymbols) ||
			line[i].includes(regexSymbols)
		);
	}
}

for (let i = 0; i < input.length - 1; i++) {
	let line = input[i];
	let prevLine = input[i - 1];
	let nextLine = input[i + 1];

	for (let i = 0; i < findNumbers(line).length; i++) {
		let number = findNumbers(line)[i];
		if (checkForSymbols(line, prevLine, nextLine, number) === true) {
			result += Number(findNumbers(line)[i].number);
			console.log(findNumbers(line)[i].number);
		}
	}
}

// console.log(result);
