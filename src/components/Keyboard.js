import React, { useEffect, useContext, useCallback } from 'react'
import Key from './Key';
import { AppContext } from '../App';

function Keyboard() {
	const keyline1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
	const keyline2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
	const keyline3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
	const { 
		onDelete, 
		onEnter, 
		onKeyPress, 
		disabledLetters, 
		correctLetters,
		misplacedLetters,
		gameStatus } = useContext(AppContext);

	const handleKeyDown = useCallback((e) => {
		if(gameStatus.gameOver) return;
		if(e.key === 'Backspace') {
			onDelete();
		} else if(e.key === 'Enter') {
			onEnter();
		} else {
			onKeyPress(e.key);
		}
	}, )

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}
	}, [handleKeyDown]);

	return (
		<div className='keyboard' onKeyDown={handleKeyDown}>
			<div className='line1'>
				{keyline1.map((letter) => 
					<Key 
						letter={letter} 
						isDisabled={disabledLetters.includes(letter)}
						isCorrect={correctLetters.includes(letter)}
						isMisplaced={misplacedLetters.includes(letter)}
						key={letter.charCodeAt(0)}
					/>
				)}
			</div>
			<div className='line2'>
				{keyline2.map((letter) => 
					<Key 
						letter={letter} 
						isDisabled={disabledLetters.includes(letter)}
						isCorrect={correctLetters.includes(letter)}
						isMisplaced={misplacedLetters.includes(letter)}
						key={letter.charCodeAt(0)}
					/>
				)}
			</div>
			<div className='line3'>
				<Key letter={"Enter"} bigKey={true} key={0} />
				{keyline3.map((letter) => 	
					<Key 
						letter={letter} 
						isDisabled={disabledLetters.includes(letter)}
						isMisplaced={misplacedLetters.includes(letter)}
						isCorrect={correctLetters.includes(letter)}
						key={letter.charCodeAt(0)}
					/>
				)}
				<Key letter={"Delete"} bigKey={true} key={-1} />
			</div>
		</div>
	)
}

export default Keyboard;