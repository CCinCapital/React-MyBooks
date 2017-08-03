import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropDownMenu extends Component {
	static propTypes = {
		options: PropTypes.array.isRequired,
		callBackFromParent: PropTypes.func.isRequired
	}

	callBack = (event) => {
		this.props.callBackFromParent(event.target.value)
	}

	render() {
		return (
			<select 
				onChange={this.callBack}
				value={this.props.selected}
			>
				{
					this.props.options.map((option, key) => 
						<option 
							key={key} 
							value={option.value}
							disabled={option.disabled}
						>
							{option.text}
						</option>
					)
				}
			</select>
		)
	}
}

export default DropDownMenu