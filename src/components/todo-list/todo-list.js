import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TodoListItem from '../todo-list-item/todo-list-item'
import './todo-list.css'
import Footer from '../footer/footer'

const TodoList = ({
  todos,
  onDeleted,
  onToggleDone,
  allTasks,
  completeDeleted,
  onFilterChange,
  startTimer,
  stopTimer,
  changeItem,
  addItem,
}) => {
  const [todoState, setTodoState] = useState({
    content: '',
    editingId: null,
  })

  const onLabelChange = (e) => {
    setTodoState((prevState) => ({
      ...prevState,
      content: e.target.value,
    }))
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { editingId, content } = todoState

      if (editingId) {
        changeItem(editingId, content)
        setTodoState({ content: '', editingId: null })
      } else {
        addItem(content)
        setTodoState((prevState) => ({ ...prevState, content: '' }))
      }
      e.target.value = ''
    }
  }

  const startEditing = (id, content) => {
    setTodoState({
      content: content,
      editingId: id,
    })
  }

  const elements = todos.map((toDoItem) => {
    const { id, content, done, date, timerMin, timerSec, runing, timerId } = toDoItem
    const isDone = done || false
    const { editingId } = todoState
    return (
      <li key={id} className={editingId === id ? 'editing' : done ? 'completed' : ''}>
        <TodoListItem
          id={id}
          data={content}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          done={isDone}
          changeItem={() => startEditing(id, content)}
          date={date}
          timerMin={timerMin}
          timerSec={timerSec}
          startTimer={() => startTimer(id)}
          stopTimer={() => stopTimer(id)}
          runing={runing}
          timerId={timerId}
        />
        {todoState.editingId === id && (
          <input
            type="text"
            className="edit"
            onChange={onLabelChange}
            onKeyDown={onKeyDown}
            value={todoState.content}
          />
        )}
      </li>
    )
  })

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
      <Footer allTasks={allTasks} completeDeleted={completeDeleted} onFilterChange={onFilterChange} />
    </section>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  allTasks: PropTypes.number.isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  completeDeleted: PropTypes.func,
  onFilterChange: PropTypes.func,
  changeItem: PropTypes.func,
  addItem: PropTypes.func,
}

TodoList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  allTasks: 0,
  completeDeleted: () => {},
  onFilterChange: () => {},
  changeItem: () => {},
  addItem: () => {},
}

export default TodoList
