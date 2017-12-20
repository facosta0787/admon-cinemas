import React from 'react'
import { Button, Form} from 'semantic-ui-react'

const FormMovies = (props) => (
  <Form onSubmit={props.onSubmit}>
    <Form.Field>
      <label>Title</label>
      <input type='text' name='title'/>
    </Form.Field>
    <Form.Group widths='equal'>
      <Form.Field>
        <label>Release Date</label>
        <input type='text' placeholder='mm-dd-yyyy' name='releaseDate'/>
      </Form.Field>
      <Form.Field>
        <label>Language</label>
        <input type='text' name='language'/>
      </Form.Field>
    </Form.Group>
    <Form.Button color='green'>Submit</Form.Button>
  </Form>
)

export default FormMovies
