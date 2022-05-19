import React, { useContext } from 'react';
import { AppContext } from '../App';

function Key({ letter, bigKey, isDisabled, isCorrect, isMisplaced }) {
	const { onDelete, onEnter, onKeyPress, gameStatus } = useContext(AppContext);

	const selectKey = () => {
		if(gameStatus.gameOver) return;
		if(letter === 'Delete') {
			onDelete();
		} else if(letter === 'Enter') {
			onEnter();
		} else {
			onKeyPress(letter);
		}
	}

	return (
		<div className='key' 
			id={bigKey ? "big" :  (isCorrect ? "correct" :  (isMisplaced ? "misplaced" :(isDisabled ? "disabled" : undefined)))} 
			onClick={selectKey}>
			{letter}
		</div>
	)
}

export default Key