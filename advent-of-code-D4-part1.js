'use strict';
const fs = require('fs');
const input = fs.readFileSync('inputD4.txt', 'utf8').split('\r\n');

let result = 0;

function getNumbers(line, pos) {
	return line.split(': ')[1].split(' | ')[pos].match(/\d+/g);
}

for (let i = 0; i < input.length; i++) {
	const line = input[i];
	let cardScore = 0;
	const winningNumbers = getNumbers(line, 0);
	const obtainedNumbers = getNumbers(line, 1);

	obtainedNumbers.forEach((number) => {
		if (winningNumbers.indexOf(number) >= 0) {
			if (cardScore === 0) {
				cardScore = 1;
			} else {
				cardScore = cardScore * 2;
			}
		}
	});

	if (cardScore > 0) {
		result += cardScore;
	}
}
console.log(result);
