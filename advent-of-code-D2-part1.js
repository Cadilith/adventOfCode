'use strict';
const fs = require('fs');
const input = fs.readFileSync('inputD2.txt', 'utf8').split('\r\n');

//sum of the IDs of possible games
let result = 0;


for (let i = 0; i < input.length; i++) {
	const line = input[i];
	
	//each line of input is splitted to keep only the draws
	//each game will be an array of draws (objects) with key/values of colors and qties
	const game = line
		.split(': ')[1]
		.split('; ')
		.map((draw) => {
			const drawResult = {
				red: 0,
				green: 0,
				blue: 0,
			};
			//for each draw, get a array of cubes
			const cubes = draw.split(', ');
			//for each cube drawn keep result by color in drawResult
			for (let cube of cubes) {
				if (cube.endsWith('red')) {
					drawResult.red = cube.split(' ')[0];
				}
				if (cube.endsWith('green')) {
					drawResult.green = cube.split(' ')[0];
				}
				if (cube.endsWith('blue')) {
					drawResult.blue = cube.split(' ')[0];
				}
			}
			return drawResult;
		});

	//get the maximum qty for each color in this game
	const maxRed = Math.max(...game.map((draw) => draw.red));
	const maxGreen = Math.max(...game.map((draw) => draw.green));
	const maxBlue = Math.max(...game.map((draw) => draw.blue));

	//for this game, if the draws matches the elf maximum cubes, add the id of the game to the result.
	if (maxRed <= 12 && maxGreen <= 13 && maxBlue <= 14) {
		result += i + 1;
	}
}

console.log(result);
