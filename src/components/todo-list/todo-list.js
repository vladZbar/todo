import React from 'react'
import PropTypes from 'prop-types'

import TodoListItem from '../todo-list-item/todo-list-item'
import './todo-list.css'
import Footer from '../footer/footer'

export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array,
    allTasks: PropTypes.number.isRequired,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    completeDeleted: PropTypes.func,
    onFilterChange: PropTypes.func,
    changeItem: PropTypes.func,
    addItem: PropTypes.func,
  }

  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleDone: () => {},
    allTasks: 0,
    completeDeleted: () => {},
    onFilterChange: () => {},
    changeItem: () => {},
    addItem: () => {},
  }

  state = {
    content: '',
    editingId: null,
  }

  onLabelChange = (e) => {
    this.setState({
      content: e.target.value,
    })
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { editingId, content } = this.state

      if (editingId) {
        this.props.changeItem(editingId, content)
        this.setState({ content: '', editingId: null })
      } else {
        this.props.addItem(content)
        this.setState({ content: '' })
      }
      e.target.value = ''
    }
  }

  startEditing = (id, content) => {
    this.setState({
      content: content,
      editingId: id,
    })
  }

  render() {
    const { todos, onDeleted, onToggleDone, allTasks, completeDeleted, onFilterChange } = this.props

    const elements = todos.map((toDoItem) => {
      const { id, content, done, date } = toDoItem
      const isDone = done || false
      const { editingId } = this.state

      return (
        <li
          key={id}
          className={editingId === id ? 'editing' : done ? 'completed' : ''}
          onClick={() => onToggleDone(id)}
        >
          <TodoListItem
            data={content}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            done={isDone}
            changeItem={() => this.startEditing(id, content)}
            date={date}
          />
          {this.state.editingId === id && (
            <input
              type="text"
              className="edit"
              onChange={this.onLabelChange}
              onKeyDown={this.onKeyDown}
              value={this.state.content}
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
}
