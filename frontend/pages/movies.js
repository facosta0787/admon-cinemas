import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'
import moment from 'moment'
import Form from '../components/FormMovies'
import Item from '../components/ItemList'
import { Button, List } from 'semantic-ui-react'
import Menu from '../components/Menu'

class Movies extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: props.data,
      _id: null,
      activeItem: 'movies'
    }
  }

  static async getInitialProps({ req }) {
    const res = await fetch(`http://localhost:3001/api/movie`,{
      method: 'GET'
    })
    const data = await res.json()
    return data
  }

  handleMenuClick = (event,{ name }) => {
    event.preventDefault()
    this.setState({
      activeItem:name
    })

    if(name === 'home') return Router.push('/')

    Router.push(`/${name}`)
  }

  handleSubmit = async (event) =>{
    event.preventDefault()
    const params = {
      _id: this.state._id,
      name:event.target[0].value,
      releaseDate: event.target[1].value,
      language: event.target[2].value,
    }

    const options = {
      method:'POST',
      headers: {
        'Accept':'application/json; charset=utf-8',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(params)
    }
    const response = await fetch('http://localhost:3001/api/movie',options)
    const res = await response.json()

    if(res.status != 200) return alert(`${res.message}`)

    if(res.status === 200){

      if(!this.state._id){
        this.setState({
          movies: [...this.state.movies, res.data],
          _id: null
        })
      }else{
        this.fetchMovies()
      }

      document.getElementsByName('title')[0].value = ''
      document.getElementsByName('releaseDate')[0].value = ''
      document.getElementsByName('language')[0].value = ''
      document.getElementsByName('title')[0].focus()
    }
  }

  handleRemove = async (event) => {
    event.preventDefault()
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
    const response = await fetch('http://localhost:3001/api/movie',options)
    const res = await response.json()
    if(res.status === 200){
        let movies = [ ...this.state.movies ]
        movies.splice(movies.findIndex( movie => movie._id === _id ),1)
        this.setState({
          movies
        })
    }

  }

  handleModify = async (event) => {
    event.preventDefault()
    let x = event.target.parentElement
    let y = x.parentElement
    await this.setState({
      _id: y.querySelector('[name = _id]').value
    })
    const movie = this.state.movies.find( mov => mov._id === this.state._id )
    document.querySelector('[name=title]').value = movie.name
    document.querySelector('[name=releaseDate]').value = moment.utc(movie.releaseDate).format('MM-DD-YYYY')
    document.querySelector('[name=language]').value = movie.language
    console.log(this.state._id)
  }

  fetchMovies = async () =>{
    const res = await fetch(`http://localhost:3001/api/movie`,{
      method: 'GET'
    })
    const data = await res.json()
    this.setState({
      movies: data.data,
      _id: null
    })
  }

  render() {
    const { movies } = this.state
    return (
      <div>
      <Menu onClick={this.handleMenuClick} activeItem={this.state.activeItem}/>
      <Content>
        <h1>Movies</h1>
        <Form onSubmit={this.handleSubmit}/>
        <List divided relaxed style={{ marginTop: '40px', marginBottom: '40px' }}>
          {
            movies && movies.map( (movie,idx) => {
              return(
                <Item key={idx} onRemove={this.handleRemove} onModify={this.handleModify} { ...movie } />
              )
            })
          }
        </List>
      </Content>
      </div>
    )
  }

}

export default Movies

const Content = styled.div`
  width: 80%;
  height: 97vh;
  margin: 0 auto;
`
