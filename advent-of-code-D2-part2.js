'use strict';
const fs = require('fs');
const input = fs.readFileSync('inputD2.txt', 'utf8').split('\r\n');

//sum of the IDs of possible games
let result = 0;

//each line of input is splitted to keep only the draws
for (let i = 0; i < input.length; i++) {
	const line = input[i];

	//each game will be an array of draws (objects)
	//with key/values of colors and qties
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

	//Power of this game
	const power = maxRed * maxGreen * maxBlue;
	//add this power to final result
	result += power;
}

console.log(result);
