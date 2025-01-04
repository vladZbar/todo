import React from 'react'
import './search-panel.css'

export default class SearchPanel extends React.Component {
  state = {
    content: '',
    min: '',
    sec: '',
    maxValue: false,
  }

  onLabelChange = (e) => {
    this.setState({
      content: e.target.value,
    })
  }

  changeMin = (e) => {
    if (Number(e.target.value) > 60 || isNaN(e.target.value)) {
      this.setState({ maxValue: true })
      console.log('Значение должно быть числом <= 60')
    } else {
      this.setState({
        maxValue: false,
        min: e.target.value,
      })
    }
  }

  changeSec = (e) => {
    if (Number(e.target.value) > 60 || isNaN(e.target.value)) {
      this.setState({ maxValue: true })
      console.log('Значение должно быть числом <= 60')
    } else {
      this.setState({
        maxValue: false,
        sec: e.target.value,
      })
    }
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.addItem(this.state.content, this.state.min, this.state.sec)
      this.setState({ content: '', min: '', sec: '' })
      e.target.value = ''
    }
  }

  render() {
    const searchText = 'Task'

    return (
      <form onKeyDown={this.onKeyDown} className="new-todo-form">
        <input
          onChange={this.onLabelChange}
          className="new-todo"
          placeholder={searchText}
          autoFocus
          value={this.state.content}
        />
        <input onChange={this.changeMin} value={this.state.min} className="new-todo-form__timer" placeholder="Min" />
        <input onChange={this.changeSec} value={this.state.sec} className="new-todo-form__timer" placeholder="Sec" />
      </form>
    )
  }
}
