import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MaterialIcon from 'material-icons-react'

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
export default class Navigation extends Component {
  render () {
    const renderIcons = () => {
      return this.props.navIcons.map((group, key) => {
        return (
          <IconButton
            key={key}
            id={group[1]}
            onClick={() => this.props.getNavIconName(group[1])}
          >
            <MaterialIcon
              icon={group[0]}
            />
          </IconButton>
        )
      })
    }

    return (
      <div>
        <AppBar
          title={this.props.name}
          onLeftIconButtonClick = {this.props.drawerToggle}
          iconElementRight = {
            <div>
              {renderIcons()}
            </div>
          }
        />
      </div>
    )
  }
}
