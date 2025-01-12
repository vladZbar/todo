import React, { useState } from 'react'
import './task-filter.css'

const TaskFilter = ({ onFilterChange }) => {
  const [currentFilter, setCurrentFilter] = useState('All')

  const classChange = (e) => {
    const text = e.target.textContent
    setCurrentFilter(text)
    onFilterChange(text)
  }

  return (
    <ul className="filters">
      <li>
        <button onClick={classChange} className={currentFilter === 'All' ? 'selected' : ''}>
          All
        </button>
      </li>
      <li>
        <button onClick={classChange} className={currentFilter === 'Active' ? 'selected' : ''}>
          Active
        </button>
      </li>
      <li>
        <button onClick={classChange} className={currentFilter === 'Completed' ? 'selected' : ''}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter
