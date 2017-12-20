import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'
import { Card, List } from 'semantic-ui-react'
import Menu from '../components/Menu'
import moment from 'moment'

class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home'
    }
  }
  static async getInitialProps({ req }) {
    const res = await fetch(`http://localhost:3001/api/cinema`,{
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

  render(){
    const cinemas = this.props.data
    return(
      <div>
      <Menu onClick={this.handleMenuClick} activeItem={this.state.activeItem}/>
      <Content>
        {
          cinemas.map( (cinema,idx) => {
            return(
              <Card style={{ width: '100%' }} key={idx}>
                <Card.Content>
                  <Card.Header>
                    {cinema.name}
                  </Card.Header>
                  <Card.Meta>
                    {cinema.location}
                  </Card.Meta>
                </Card.Content>
                <Card.Content>
                  <List divided relaxed>
                    {
                      cinema.movies.map( (movie,idx) => {
                        return(
                          <List.Item key={idx}>
                            <List.Content>
                            <List.Header>
                              {movie.name}
                            </List.Header>
                            <List.Description>
                              Released: {moment.utc(movie.releaseDate).format('MM-DD-YYYY')} <br />
                              Language: {movie.language}
                            </List.Description>
                            </List.Content>
                          </List.Item>
                        )
                      })
                    }
                  </List>
                </Card.Content>
              </Card>
            )
          })
        }
      </Content>
      </div>
    )
  }
}
export default Home

const Content = styled.div`
  width: 80%;
  height: 97vh;
  margin: 0 auto;
`
