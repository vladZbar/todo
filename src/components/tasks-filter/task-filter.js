import React from 'react'
import './task-filter.css'

export default class TaskFilter extends React.Component {
  state = {
    currentFilter: 'All',
  }

  classChange = (e) => {
    const text = e.target.textContent
    this.setState({ currentFilter: text })
    this.props.onFilterChange(text)
  }

  render() {
    const { currentFilter } = this.state

    return (
      <ul className="filters">
        <li>
          <button onClick={this.classChange} className={currentFilter === 'All' ? 'selected' : ''}>
            All
          </button>
        </li>
        <li>
          <button onClick={this.classChange} className={currentFilter === 'Active' ? 'selected' : ''}>
            Active
          </button>
        </li>
        <li>
          <button onClick={this.classChange} className={currentFilter === 'Completed' ? 'selected' : ''}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
