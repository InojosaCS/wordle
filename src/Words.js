import wordsList from './data-bank/words-list.txt';
import commonWordsList from './data-bank/common-words-list.txt';

export const boardDefault = [
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""]
]

export const boardColorDefault = [
	["black", "black", "black", "black", "black"],
	["black", "black", "black", "black", "black"],
	["black", "black", "black", "black", "black"],
	["black", "black", "black", "black", "black"],
	["black", "black", "black", "black", "black"],
	["black", "black", "black", "black", "black"]
]

export const getWords = async () => {
	let words;
	
	await fetch(wordsList)
		.then(response => response.text())
		.then(text => {
			words = text.split('\n');
		});

	words = words.map(word => word.toUpperCase());
	const correctWord = words[Math.floor(Math.random() * words.length)];
	words = new Set(words);
	return { words, correctWord }; 
}
