const fs = require('fs');
const batters = require("./2018batters.json");
const pitchers = require("./2018pitchers.json");

const players = batters.concat( pitchers );

const playersList = players.map( player => {
	const name = player.Name.split(' ');
	return { first: name[0], last: name[1] };
}).sort( (a,b) => {
	return a.last.toLowerCase() > b.last.toLowerCase() ? 1 : -1;
});

let playersObj = {};
playersList.forEach( ({first, last}) => {
	if ( playersObj[last.toLowerCase()] ) {
		playersObj[last.toLowerCase()].firsts.push(first);
	} else {
		playersObj[last.toLowerCase()] = {
			found: false,
			firsts: [ first ],
			last: last
		}
	}
});

const writeFile = (err) => err ? console.error(err) : console.log( 'file writte' );

fs.writeFile('2018playersList.json', JSON.stringify(playersList ),  writeFile );
fs.writeFile('2018playersObj.json', JSON.stringify(playersObj ), writeFile );
