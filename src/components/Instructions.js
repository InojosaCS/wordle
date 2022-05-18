import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Instructions() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="dark" onClick={handleShow}>
				Instructions
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Instructions</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ol>
						<li>You have to guess the Wordle in six goes or less.</li>
						<li>Every word you enter must be in the word list. ...</li>
						<li>A correct letter turns green.</li>
						<li>A correct letter in the wrong place turns yellow.</li>
						<li>An incorrect letter turns gray.</li>
						<li>Letters can be used more than once.</li>
					</ol>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Instructions;