import { React, Component } from 'react'

import AppHeader from '../app-header/app-header'
import TodoList from '../todo-list/todo-list'
import './app.css'

export default class App extends Component {
  state = {
    todoData: [],
    filter: 'All',
  }

  createTodoItem(text, min = 0, sec = 0) {
    return {
      className: '',
      id: Math.random().toString(36).slice(2),
      state: '',
      content: text,
      done: false,
      date: new Date(),
      timerMin: Number(min),
      timerSec: Number(sec),
      timerId: null,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((el) => el.id !== id)
      return {
        todoData: newTodoData,
      }
    })
  }

  addItem = (text, min, sec) => {
    text = text.trim()

    if (text.length > 0) {
      const newItem = this.createTodoItem(text, min, sec)

      this.setState(({ todoData }) => ({
        todoData: [...todoData, newItem],
      }))
    }
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      if (idx === -1) return

      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
        className: oldItem.done ? '' : 'completed',
      }

      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  completeDeleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((el) => el.className !== 'completed')
      return {
        todoData: newTodoData,
      }
    })
  }

  handleFilterChange = (filter) => {
    this.setState({ filter }, () => {
      this.startAllTimers()
    })
  }

  changeItem = (id, newContent) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      if (idx === -1) return

      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        content: newContent,
        done: false,
      }

      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  startTimer = (id) => {
    const timerId = setInterval(() => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        if (idx === -1) return

        const { timerMin, timerSec, done } = todoData[idx]

        if (done) {
          return
        }

        if (timerSec > 0) {
          return {
            todoData: [
              ...todoData.slice(0, idx),
              { ...todoData[idx], timerSec: timerSec - 1 },
              ...todoData.slice(idx + 1),
            ],
          }
        } else if (timerMin > 0) {
          return {
            todoData: [
              ...todoData.slice(0, idx),
              { ...todoData[idx], timerMin: timerMin - 1, timerSec: 59 },
              ...todoData.slice(idx + 1),
            ],
          }
        } else {
          clearInterval(timerId)
          return null
        }
      })
    }, 1000)

    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((todo) => (todo.id === id ? { ...todo, timerId } : todo)),
      }
    })
  }

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      if (idx !== -1 && todoData[idx].timerId) {
        clearInterval(todoData[idx].timerId)
        return {
          todoData: todoData.map((todo) => (todo.id === id ? { ...todo, timerId: null } : todo)),
        }
      }
      return null
    })
  }

  startAllTimers = () => {
    this.state.todoData.forEach((todo) => {
      if (todo.timerId === null) return
      if (todo.timerId) {
        clearInterval(todo.timerId)
      }
      this.startTimer(todo.id)
    })
  }

  render() {
    const { todoData, filter } = this.state
    const filteredTodos = todoData.filter((todo) => {
      if (filter === 'All') return true
      if (filter === 'Completed') return todo.done
      if (filter === 'Active') return !todo.done
      return true
    })

    const doneCount = this.state.todoData.filter((el) => el.done).length
    const todoCount = this.state.todoData.length - doneCount

    return (
      <section className="todoapp">
        <AppHeader todos={this.state.todoData} addItem={this.addItem} />
        <TodoList
          todos={filteredTodos}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          allTasks={todoCount}
          completeDeleted={this.completeDeleted}
          onFilterChange={this.handleFilterChange}
          changeItem={this.changeItem}
          addItem={this.addItem}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
        />
      </section>
    )
  }
}
