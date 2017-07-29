import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropDownMenu extends Component {
	static propTypes = {
		callBackFromParent: PropTypes.func.isRequired
	}

	callBack = (event) => {
		this.props.callBackFromParent(event.target.value)
	}

	render() {
		return (
			<select 
				value='null'
				onChange={this.callBack}
			>
				{this.props.children}
			</select>
		)
	}
}

export default DropDownMenu