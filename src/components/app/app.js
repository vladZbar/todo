import { React, Component } from 'react'

import AppHeader from '../app-header/app-header'
import TodoList from '../todo-list/todo-list'
import './app.css'

export default class App extends Component {
  state = {
    todoData: [],
    filter: 'All',
  }
  // startTimer(minutes, seconds) {
  //   // Проверяем, чтобы минуты и секунды были неотрицательными
  //   if (minutes < 0 || seconds < 0) {
  //     console.error('Минуты и секунды должны быть неотрицательными числами.')
  //     return
  //   }

  //   let totalSeconds = minutes * 60 + seconds // Переводим всё в секунды

  //   const timerId = setInterval(() => {
  //     // Вычисляем оставшиеся минуты и секунды
  //     const minutesLeft = Math.floor(totalSeconds / 60)
  //     const secondsLeft = totalSeconds % 60

  //     // Форматируем минуты и секунды с ведущими нулями
  //     const formattedMinutes = String(minutesLeft).padStart(2, '0')
  //     const formattedSeconds = String(secondsLeft).padStart(2, '0')

  //     // Выводим таймер в консоль
  //     console.log(`${formattedMinutes}:${formattedSeconds}`)

  //     // Уменьшаем общее количество секунд
  //     totalSeconds++

  //     // Останавливаем таймер после достижения 24 часов (86400 секунд)
  //     if (totalSeconds >= 86400) {
  //       clearInterval(timerId)
  //       console.log('Таймер завершен.')
  //     }
  //   }, 1000) // Интервал 1000 мс (1 секунда)
  // }

  // startTimer = (id) => {
  //   const updatedTodos = this.state.todoData.map((todo) => {
  //     if (todo.id === id) {
  //       if (todo.timerId) clearInterval(todo.timerId) // Очищаем предыдущий таймер

  //       let totalSeconds = todo.timerMin * 60 + todo.timerSec // Переводим минуты и секунды в общее количество секунд

  //       const timerId = setInterval(() => {
  //         this.setState(({ todoData }) => {
  //           return todoData.map((t) => {
  //             if (t.id === id) {
  //               if (totalSeconds > 0) {
  //                 totalSeconds-- // Уменьшаем общее количество секунд
  //                 const minutesLeft = Math.floor(totalSeconds / 60)
  //                 const secondsLeft = totalSeconds % 60
  //                 return { ...t, timerMin: minutesLeft, timerSec: secondsLeft } // Обновляем состояние
  //               } else {
  //                 clearInterval(timerId) // Останавливаем таймер при достижении нуля
  //                 return { ...t, countingUp: true } // Меняем направление таймера
  //               }
  //             }
  //             return t // Возвращаем остальные элементы без изменений
  //           })
  //         })
  //       }, 1000) // Интервал 1000 мс (1 секунда)

  //       return { ...todo, timerId } // Сохраняем ID таймера в состоянии
  //     }
  //     return todo // Возвращаем остальные элементы без изменений
  //   })

  //   this.setState({ todoData: updatedTodos }) // Обновляем состояние todoData
  // }

  // stopTimer = (id) => {
  //   const updatedTodos = this.state.todoData.map((todo) => {
  //     if (todo.id === id) {
  //       clearInterval(todo.timerId) // Очищаем таймер
  //       return { ...todo, timerId: null } // Сбрасываем ID таймера
  //     }
  //     return todo
  //   })

  //   this.setState({ todoData: updatedTodos })
  // }

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
    this.setState({ filter })
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

  // componentDidMount() {
  //   this.setState({ originalTodoData: [...this.state.todoData] })
  //   this.timerID = setInterval(() => this.startTimer(), 1000)
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerID)
  // }

  render() {
    // this.startTimer(0, 0)

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
