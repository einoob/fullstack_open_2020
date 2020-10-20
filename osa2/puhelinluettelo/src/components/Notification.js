import React from 'react'

const Notification = ({message}) => {
	if (message === null) {
		return (null)
	}
	const notificationStyle = {
		color: 'darkgreen',
		fontSize: 18,
		borderColor: 'darkgreen',
		borderStyle: 'solid',
		backgroundColor: 'lightgreen',
		borderRadius: 5,
		padding: 10
	}
	return <p style={notificationStyle}>
		{message}
	</p>
}

export default Notification
