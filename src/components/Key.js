import React, { useContext } from 'react';
import { AppContext } from '../App';

function Key({ letter, bigKey }) {
	const { onDelete, onEnter, onKeyPress } = useContext(AppContext);

	const selectKey = () => {
		if(letter === 'Backspace') {
			onDelete();
		} else if(letter === 'Enter') {
			onEnter();
		} else {
			onKeyPress(letter);
		}
	}

	return (
		<div className='key' id={bigKey && "big"} onClick={selectKey}>
			{letter}
		</div>
	)
}

export default Key