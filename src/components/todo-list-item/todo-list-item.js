import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import './todo-list-item.css'

export default class TodoListItem extends React.Component {
  static defaultProps = {
    data: [],
    onDeleted: () => {},
    onToggleDone: () => {},
    changeItem: () => {},
    done: false,
  }

  static propTypes = {
    data: PropTypes.array,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    changeItem: PropTypes.func,
    done: PropTypes.bool,
  }

  clickTimer(e) {
    e.stopPropagation()
    this.startTimer(this.props.id)
    // console.log('Timer clicked for ID:', this.props.id)
  }

  stop(e) {
    e.stopPropagation()
    this.stopTimer(this.props.id)
  }

  // startTimer

  state = {
    min: this.props.timerMin, // Начальные минуты
    sec: this.props.timerSec, // Начальные секунды
    timerId: null,
    countingUp: false, // Состояние для отслеживания направления таймера
  }

  startTimer = () => {
    if (this.state.timerId) clearInterval(this.state.timerId) // Очищаем предыдущий таймер

    const timerId = setInterval(() => {
      this.setState(({ min, sec, countingUp }) => {
        if (!countingUp) {
          // Таймер идет вниз
          if (sec > 0) {
            return { sec: sec - 1 }
          } else if (min > 0) {
            return { min: min - 1, sec: 59 }
          } else {
            // Таймер достиг нуля, начинаем обратный отсчет
            return { countingUp: true, min: 0, sec: 0 } // Сбросим до 0
          }
        } else {
          // Таймер идет вверх
          if (sec < 59) {
            return { sec: sec + 1 }
          } else {
            return { min: min + 1, sec: 0 }
          }
        }
      })
    }, 1000) // Интервал 1000 мс (1 секунда)

    this.setState({ timerId })
  }

  stopTimer = () => {
    clearInterval(this.state.timerId)
    this.setState({ timerId: null })
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }

  xxx(e) {
    e.stopPropagation()
    this.props.changeItem()
  }

  render() {
    const { data, onDeleted, onToggleDone, done, date } = this.props
    const { min, sec } = this.state
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={(e) => {
            e.stopPropagation()
            onToggleDone
          }}
        />
        <label>
          <span
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="titl"
          >
            {data}
          </span>
          <span className="description">
            <button onClick={(e) => this.clickTimer(e)} className="icon icon-play"></button>
            <button onClick={(e) => this.stop(e)} className="icon icon-pause"></button>
            <span>{`${min}:${sec < 10 ? `0${sec}` : sec}`}</span>
          </span>
          <span className="description">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={(e) => this.xxx(e)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}
