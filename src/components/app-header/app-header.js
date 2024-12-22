import React from 'react'
import PropTypes from 'prop-types'

import './app-header.css'
import SearchPanel from '../search-panel/search-panel'

export default class AppHeader extends React.Component {
  static propTypes = {
    addItem: PropTypes.func,
  }

  static defaultProps = {
    addItem: () => {},
  }

  render() {
    const { addItem } = this.props

    return (
      <header className="header">
        <h1 className="title">todos</h1>
        <SearchPanel addItem={addItem} />
      </header>
    )
  }
}
