import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import './todo-list-item.css'

const TodoListItem = ({
  data,
  onDeleted,
  onToggleDone,
  done,
  date,
  timerMin,
  timerSec,
  id,
  runing,
  startTimer,
  stopTimer,
  changeItem,
}) => {
  const [todoItem, setTodoItem] = useState({
    id: id,
    min: timerMin,
    sec: timerSec,
    timerId: null,
    countingUp: false,
    runing: runing,
  })

  const clickTimer = (e) => {
    e.stopPropagation()
    if (!todoItem.runing && !todoItem.timerId) {
      startTimer()
      setTodoItem((prevState) => ({ ...prevState, runing: true }))
    }
  }

  const stop = (e) => {
    e.stopPropagation()
    stopTimer()
    setTodoItem((prevState) => ({ ...prevState, runing: false }))
  }

  const xxx = (e) => {
    e.stopPropagation()
    changeItem()
  }

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone(id)} />
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
          <button
            onClick={(e) => {
              clickTimer(e)
            }}
            className="icon icon-play"
          ></button>
          <button
            onClick={(e) => {
              stop(e)
            }}
            className="icon icon-pause"
          ></button>
          <span>{`${timerMin}:${timerSec < 10 ? `0${timerSec}` : timerSec}`}</span>
        </span>
        <span className="description">
          {`created ${formatDistanceToNow(date, {
            includeSeconds: true,
            locale: KG,
            addSuffix: true,
          })}`}
        </span>
      </label>
      <button className="icon icon-edit" onClick={(e) => xxx(e)}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  )
}

TodoListItem.defaultProps = {
  data: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  changeItem: () => {},
  done: false,
}

TodoListItem.propTypes = {
  data: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  changeItem: PropTypes.func,
  done: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  timerMin: PropTypes.number,
  timerSec: PropTypes.number,
}

export default TodoListItem
