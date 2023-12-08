'use strict';
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
const lines = data.split(/\n/);
const dic = {
	one: 'o1e',
	two: 't2o',
	three: 't3e',
	four: 'f4r',
	five: 'f5e',
	six: 's6x',
	seven: 's7n',
	eight: 'e8t',
	nine: 'n9e',
};

function getNumbers(arr) {
	let arrayOfNumbers = [];
	arr.forEach((line) => {
		Object.keys(dic).forEach((key) => {
			line = line.replaceAll(key, dic[key]);
		});
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
