import { React, useState } from 'react'

import AppHeader from '../app-header/app-header'
import TodoList from '../todo-list/todo-list'
import './app.css'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')
  const [timers, setTimers] = useState({})

  const createTodoItem = (text, min = 0, sec = 0) => {
    return {
      className: '',
      id: Math.random().toString(36).slice(2),
      state: '',
      content: text,
      done: false,
      date: new Date(),
      timerMin: Number(min),
      timerSec: Number(sec),
    }
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id))
    stopTimer(id) // Остановите таймер при удалении элемента
  }

  const addItem = (text, min, sec) => {
    text = text.trim()
    if (text.length > 0) {
      const newItem = createTodoItem(text, min, sec)
      setTodoData((prevTodoData) => [...prevTodoData, newItem])
    }
  }

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      if (idx === -1) return prevTodoData

      const oldItem = prevTodoData[idx]
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
        className: oldItem.done ? '' : 'completed',
      }
      stopTimer(id)
      return [...prevTodoData.slice(0, idx), newItem, ...prevTodoData.slice(idx + 1)]
    })
  }

  const completeDeleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.className !== 'completed'))
  }

  const handleFilterChange = (filter) => {
    setFilter(filter)
  }

  const changeItem = (id, newContent) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      if (idx === -1) return prevTodoData

      const oldItem = prevTodoData[idx]
      const newItem = {
        ...oldItem,
        content: newContent,
        done: false,
      }

      return [...prevTodoData.slice(0, idx), newItem, ...prevTodoData.slice(idx + 1)]
    })
  }

  const startTimer = (id) => {
    const existingTimer = timers[id]
    if (existingTimer) return

    const timerId = setInterval(() => {
      setTodoData((prevTodoData) => {
        const idx = prevTodoData.findIndex((el) => el.id === id)
        if (idx === -1) return prevTodoData

        const { timerMin, timerSec } = prevTodoData[idx]

        if (timerSec > 0) {
          return [
            ...prevTodoData.slice(0, idx),
            { ...prevTodoData[idx], timerSec: timerSec - 1 },
            ...prevTodoData.slice(idx + 1),
          ]
        } else if (timerMin > 0) {
          return [
            ...prevTodoData.slice(0, idx),
            { ...prevTodoData[idx], timerMin: timerMin - 1, timerSec: 59 },
            ...prevTodoData.slice(idx + 1),
          ]
        } else {
          clearInterval(timerId)
          return prevTodoData
        }
      })
    }, 1000)

    setTimers((prevTimers) => ({ ...prevTimers, [id]: timerId }))
  }

  const stopTimer = (id) => {
    const timerId = timers[id]
    if (timerId) {
      clearInterval(timerId)
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers }
        delete newTimers[id]
        return newTimers
      })
    }
  }

  const filteredTodos = todoData.filter((todo) => {
    if (filter === 'All') return true
    if (filter === 'Completed') return todo.done
    if (filter === 'Active') return !todo.done
    return true
  })

  const doneCount = todoData.filter((el) => el.done).length
  const todoCount = todoData.length - doneCount

  return (
    <section className="todoapp">
      <AppHeader todos={todoData} addItem={addItem} />
      <TodoList
        todos={filteredTodos}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        allTasks={todoCount}
        completeDeleted={completeDeleted}
        onFilterChange={handleFilterChange}
        changeItem={changeItem}
        startTimer={startTimer}
        stopTimer={stopTimer}
        filter={filter}
      />
    </section>
  )
}

export default App
