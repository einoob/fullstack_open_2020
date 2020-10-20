import React from 'react'

const Errormessage = ({errorMessage}) => {
	if (errorMessage === null) {
		return (null)
	}
	const errormessageStyle = {
		color: 'darkred',
		fontSize: 18,
		borderColor: 'darkred',
		borderStyle: 'solid',
		backgroundColor: 'lightpink',
		borderRadius: 5,
		padding: 10
	}
	return (
		<p style={errormessageStyle}>
			{errorMessage}
		</p>
	)
}

export default Errormessage