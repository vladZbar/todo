import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../tasks-filter/task-filter'
import './footer.css'

const Footer = ({ allTasks, completeDeleted, onFilterChange }) => {
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

Footer.propTypes = {
  allTasks: PropTypes.number.isRequired,
  completeDeleted: PropTypes.func,
  onFilterChange: PropTypes.func,
}

Footer.defaultProps = {
  allTasks: 0,
  completeDeleted: () => {},
  onFilterChange: () => {},
}

export default Footer
