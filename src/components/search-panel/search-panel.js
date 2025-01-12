import React, { useState } from 'react'
import './search-panel.css'

const SearchPanel = ({ addItem }) => {
  const [searchState, setSearchState] = useState({
    content: '',
    min: '',
    sec: '',
    maxValue: false,
  })

  const onLabelChange = (e) => {
    setSearchState((prevState) => ({
      ...prevState,
      content: e.target.value,
    }))
  }

  const changeMin = (e) => {
    if (Number(e.target.value) > 60 || isNaN(e.target.value)) {
      setSearchState((prevState) => ({ ...prevState, maxValue: true }))
      console.log('Значение должно быть числом <= 60')
    } else {
      setSearchState((prevState) => ({
        ...prevState,
        maxValue: false,
        min: e.target.value,
      }))
    }
  }

  const changeSec = (e) => {
    if (Number(e.target.value) > 60 || isNaN(e.target.value)) {
      setSearchState((prevState) => ({ ...prevState, maxValue: true }))
      console.log('Значение должно быть числом <= 60')
    } else {
      setSearchState((prevState) => ({
        ...prevState,
        maxValue: false,
        sec: e.target.value,
      }))
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem(searchState.content, searchState.min, searchState.sec)
      setSearchState((prevState) => ({ ...prevState, content: '', min: '', sec: '' }))
      e.target.value = ''
    }
  }

  const searchText = 'Task'

  return (
    <form onKeyDown={onKeyDown} className="new-todo-form">
      <input
        onChange={onLabelChange}
        className="new-todo"
        placeholder={searchText}
        autoFocus
        value={searchState.content}
      />
      <input onChange={changeMin} value={searchState.min} className="new-todo-form__timer" placeholder="Min" />
      <input onChange={changeSec} value={searchState.sec} className="new-todo-form__timer" placeholder="Sec" />
    </form>
  )
}

export default SearchPanel
