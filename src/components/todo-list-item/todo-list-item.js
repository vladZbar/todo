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
    date: PropTypes.instanceOf(Date),
    timerMin: PropTypes.number,
    timerSec: PropTypes.number,
  }

  clickTimer(e) {
    e.stopPropagation()
    this.props.startTimer()
  }

  stop(e) {
    e.stopPropagation()
    this.props.stopTimer()
  }

  state = {
    id: this.props.id,
    min: this.props.timerMin,
    sec: this.props.timerSec,
    timerId: null,
    countingUp: false,
  }

  componentWillUnmount() {
    this.props.stopTimer(this.props.id)
  }

  xxx(e) {
    e.stopPropagation()
    this.props.changeItem()
  }

  render() {
    const { data, onDeleted, onToggleDone, done, date, timerMin, timerSec, id } = this.props
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
                this.clickTimer(e)
              }}
              className="icon icon-play"
            ></button>
            <button
              onClick={(e) => {
                this.stop(e)
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
        <button className="icon icon-edit" onClick={(e) => this.xxx(e)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}
