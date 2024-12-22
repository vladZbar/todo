import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../tasks-filter/task-filter'
import './footer.css'

export default class Footer extends React.Component {
  static propTypes = {
    allTasks: PropTypes.number.isRequired,
    completeDeleted: PropTypes.func,
    onFilterChange: PropTypes.func,
  }

  static defaultProps = {
    allTasks: 0,
    completeDeleted: () => {},
    onFilterChange: () => {},
  }

  render() {
    const { allTasks, completeDeleted, onFilterChange } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{allTasks} items left</span>
        <TaskFilter onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={completeDeleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
