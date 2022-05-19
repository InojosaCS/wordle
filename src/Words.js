import wordsList from './data-bank/words-list.txt';
import wordsAllowed from './data-bank/wordle-allowed-guesses.txt';

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
	let correctWord;
	
	await fetch(wordsList)
		.then(response => response.text())
		.then(text => {
			words = text.split('\n');
			words = words.map(word => word.toUpperCase());
			correctWord = words[Math.floor(Math.random() * words.length)];
	});
	

	await fetch(wordsAllowed)
		.then(response => response.text())
		.then(text => {
			words = text.split('\n');
			words = words.map(word => word.toUpperCase());
			words = new Set(words);
	});

	return { words, correctWord }; 
}
