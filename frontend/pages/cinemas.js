import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'
import { Form, Button, List, Dropdown } from 'semantic-ui-react'
import Menu from '../components/Menu'

class Cinemas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: this.formatOptions(),
      cinemas: props.cinemas,
      movies: [],
      _id: null,
      activeItem: 'cinemas'
    }
  }

  static async getInitialProps({ req }) {
    const movies = await fetch(`http://localhost:3001/api/movie`,{
      method: 'GET'
    })
    const movs = await movies.json()

    const cinemas = await fetch(`http://localhost:3001/api/cinema`,{
      method: 'GET'
    })
    const cin = await cinemas.json()

    return { movies: movs.data, cinemas:cin.data }
  }

  handleMenuClick = (event,{ name }) => {
    event.preventDefault()
    this.setState({
      activeItem:name
    })

    if(name === 'home') return Router.push('/')

    Router.push(`/${name}`)
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const params = {
      _id: this.state._id,
      name: event.target[0].value,
      location: event.target[1].value,
      movies: this.state.movies
    }

    const options = {
      method:'POST',
      headers: {
        'Accept':'application/json; charset=utf-8',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(params)
    }

    const response = await fetch('http://localhost:3001/api/cinema',options)
    const res = await response.json()

    if(res.status != 200) return console.log(res.message)

    if(!this.state._id){
      this.setState({
        cinemas: [...this.state.cinemas, res.data]
      })
    }else{
      const cinemas = await fetch(`http://localhost:3001/api/cinema`,{
        method: 'GET'
      })
      const cin = await cinemas.json()
      this.setState({
        cinemas: cin.data
      })
    }

    document.querySelector('[name = name]').value = ''
    document.querySelector('[name = location]').value = ''
    this.setState({
      movies:[],
      _id: null
    })

  }

  handleModify = async (event) => {
    event.preventDefault()
    let x = event.target.parentElement
    let y = x.parentElement
    await this.setState({
      _id: y.querySelector('[name = _id]').value
    })
    const cinema = this.state.cinemas.find( cin => cin._id === this.state._id )
    document.querySelector('[name = name]').value = cinema.name
    document.querySelector('[name = location]').value = cinema.location
    let movies = []
    cinema.movies.forEach(movie => movies.push(movie._id))
    this.setState({ movies })
    console.log(this.state._id)
  }

  handleRemove = async (event) =>{
    let x = event.target.parentElement
    let y = x.parentElement
    const _id = y.querySelector('[name = _id]').value
    const options = {
      method:'DELETE',
      headers: {
        'Accept':'application/json; charset=utf-8',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ _id })
    }
    const response = await fetch('http://localhost:3001/api/cinema',options)
    const res = await response.json()
    if(res.status === 200){
        let cinemas = [ ...this.state.cinemas ]
        cinemas.splice(cinemas.findIndex( cinema => cinema._id === _id ),1)
        this.setState({
          cinemas
        })
    }
  }

  handleChange = async (event, { value }) =>{
    await this.setState({ movies: value })
  }

  formatOptions = () => {
    let options = []
    const { movies } = this.props
    movies.forEach(movie => options.push({ key: movie._id, text: movie.name, value: movie._id }))
    return options
  }

  render() {
    const { cinemas } = this.state
    return (
      <div>
      <Menu onClick={this.handleMenuClick} activeItem={this.state.activeItem}/>
      <Content>
        <h1>Cinemas</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input tyle='text' name='name' />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input type='text' name='location'/>
          </Form.Field>
          <Form.Field>
            <label>Movies</label>
            <Dropdown
              fluid
              multiple
              selection
              options={this.state.options}
              onChange={this.handleChange}
              value={this.state.movies}/>
          </Form.Field>
          <Form.Button color='green'>Submit</Form.Button>
        </Form>
        <List divided relaxed style={{ marginTop: '40px', marginBottom: '40px' }}>
          {
            cinemas && cinemas.map( (cinema,idx) => {
              return(
                <List.Item key={idx}>
                  <List.Content floated='right'>
                    <Button color='blue'
                            size='tiny'
                            onClick={this.handleModify}>Modify</Button>
                    <Button color='red'
                            size='tiny'
                            onClick={this.handleRemove}>Remove</Button>
                  </List.Content>
                  <List.Content>
                  <List.Header>
                    {cinema.name}
                  </List.Header>
                  <List.Description>
                    Location: {cinema.location} <br />
                    <input type='hidden' name='_id' value={cinema._id}></input>
                  </List.Description>
                  </List.Content>
                </List.Item>
              )
            })
          }
        </List>
      </Content>
      </div>
    )
  }

}

export default Cinemas

const Content = styled.div`
  width: 80%;
  height: 97vh;
  margin: 0 auto;
`
