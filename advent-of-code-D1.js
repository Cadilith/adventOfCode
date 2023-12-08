'use strict';
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/);

function getNumbers(arr) {
	let arrayOfNumbers = [];
	arr.forEach((line) => {
		arrayOfNumbers.push(
			Number(line.replace(/\D/g, '').slice(0, 1) + line.replace(/\D/g, '').slice(-1))
		);
	});
	return arrayOfNumbers;
}

function sumOfNumbers(arr) {
	return getNumbers(arr).reduce((acc, curr) => {
		return acc + curr;
	}, 0);
}
console.log(sumOfNumbers(lines));
