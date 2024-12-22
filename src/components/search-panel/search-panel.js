import React from 'react'
import './search-panel.css'

export default class SearchPanel extends React.Component {
  state = {
    content: '',
  }

  onLabelChange = (e) => {
    this.setState({
      content: e.target.value,
    })
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.addItem(this.state.content)
      this.setState({ content: '' })
      e.target.value = ''
    }
  }

  render() {
    const searchText = 'What needs to be done'

    return (
      <input
        className="new-todo"
        placeholder={searchText}
        autoFocus
        onChange={this.onLabelChange}
        onKeyDown={this.onKeyDown}
        value={this.state.content}
      />
    )
  }
}
