import React from 'react'
import { Button, List } from 'semantic-ui-react'
import moment from 'moment'

const ItemList = (props) => (
  <List.Item>
    <List.Content floated='right'>
      <Button color='blue'
              size='tiny'
              onClick={ props.onModify }>Modify</Button>
      <Button color='red'
              size='tiny'
              onClick={ props.onRemove }>Remove</Button>
    </List.Content>
    <List.Content>
    <List.Header>
      {props.name}
    </List.Header>
    <List.Description>
      Released: {moment.utc(props.releaseDate).format('MM-DD-YYYY')} <br />
      Language: {props.language}
      <input type='hidden' name='_id' value={props._id}></input>
    </List.Description>
    </List.Content>
  </List.Item>
)

export default ItemList
