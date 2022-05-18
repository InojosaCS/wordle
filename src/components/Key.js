import React, { useContext } from 'react';
import { AppContext } from '../App';

function Key({ letter, bigKey, isDisabled }) {
	const { onDelete, onEnter, onKeyPress, gameStatus } = useContext(AppContext);

	const selectKey = () => {
		if(gameStatus.gameOver) return;
		if(letter === 'Backspace') {
			onDelete();
		} else if(letter === 'Enter') {
			onEnter();
		} else {
			onKeyPress(letter);
		}
	}

	return (
		<div className='key' 
			id={bigKey ? "big" : (isDisabled ? "disabled" : undefined)} 
			onClick={selectKey}>
			{letter}
		</div>
	)
}

export default Key