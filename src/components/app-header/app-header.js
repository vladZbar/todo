import React from 'react'
import PropTypes from 'prop-types'

import './app-header.css'
import SearchPanel from '../search-panel/search-panel'

const AppHeader = ({ addItem }) => {
  return (
    <header className="header">
      <h1 className="title">todos</h1>
      <SearchPanel addItem={addItem} />
    </header>
  )
}

AppHeader.propTypes = {
  addItem: PropTypes.func,
}

AppHeader.defaultProps = {
  addItem: () => {},
}

export default AppHeader
