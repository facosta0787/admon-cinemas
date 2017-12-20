import React from 'react'
import { Menu } from 'semantic-ui-react'

const MenuApp = (props) => (
  <Menu inverted>
    <Menu.Item
      name='home'
      active={props.activeItem === 'home'}
      onClick={props.onClick}>
      Home
    </Menu.Item>
    <Menu.Item
      name='movies'
      active={props.activeItem === 'movies'}
      onClick={props.onClick}>
      Movies
    </Menu.Item>
    <Menu.Item
      name='cinemas'
      active={props.activeItem === 'cinemas'}
      onClick={props.onClick}>
      Cinemas
    </Menu.Item>
  </Menu>
)

export default MenuApp
