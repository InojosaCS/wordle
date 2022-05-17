import React, { useEffect, useContext, useCallback } from 'react'
import Key from './Key';
import { AppContext } from '../App';

function Keyboard() {
	const keyline1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
	const keyline2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
	const keyline3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
	const { onDelete, onEnter, onKeyPress } = useContext(AppContext);

	const handleKeyDown = useCallback((e) => {
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
				{keyline1.map((letter) => <Key letter={letter} />)}
			</div>
			<div className='line2'>
				{keyline2.map((letter) => <Key letter={letter} />)}
			</div>
			<div className='line3'>
				<Key letter={"Enter"} bigKey={true} />
				{keyline3.map((letter) => <Key letter={letter} />)}
				<Key letter={"Delete"} bigKey={true} />
			</div>
		</div>
	)
}

export default Keyboard;