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

  render() {
    const { data, onDeleted, onToggleDone, done, changeItem, date } = this.props

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone} />
        <label>
          <span className="description">{data}</span>
          <span className="created">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={changeItem}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}
