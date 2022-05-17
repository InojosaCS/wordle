import React, { useContext } from 'react';
import { AppContext } from '../App';

function Letter({ letterPos, attempt }) {
	const { board, boardColor } = useContext(AppContext);
	const letter = board[attempt][letterPos];
	const letterState = boardColor[attempt][letterPos];

	return (
		<div className='letter' id={letterState}>
			{letter}
		</div>
	)
};

export default Letter;