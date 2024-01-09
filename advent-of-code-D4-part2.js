'use strict';
const fs = require('fs');
const input = fs.readFileSync('inputD4.txt', 'utf8').split('\r\n');

let cards = [];
let result = 0;

function getNumbers(line, pos) {
	return line.split(': ')[1].split(' | ')[pos].match(/\d+/g);
}

for (let i = 0; i < input.length; i++) {
	const line = input[i];
	let cardScore = 0;
	let numberOfCards = 1;

	const winningNumbers = getNumbers(line, 0);
	const obtainedNumbers = getNumbers(line, 1);

	obtainedNumbers.forEach((number) => {
		if (winningNumbers.indexOf(number) >= 0) {
			cardScore += 1;
		}
	});
	cards.push({
		score: cardScore,
		qty: numberOfCards,
	});
}

for (let j = 0; j < cards.length; j++) {
	if (cards[j].score > 0) {
		for (let c = j + 1; c <= j + cards[j].score && c !== cards.length; c++) {
			cards[c].qty += cards[j].qty;
		}
	}
}

result = cards.reduce((acc, object) => {
	return acc + object.qty;
}, 0);

console.log(result);
