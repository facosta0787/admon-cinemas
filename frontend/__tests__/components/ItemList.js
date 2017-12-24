import React from 'react'
import { shallow } from 'enzyme'
import ItemList from '../../components/ItemList'

it('Should be rendered',()=>{
  const onModify = jest.fn()
  const onRemove = jest.fn()
  const Item = shallow(<ItemList
                        onModify={onModify}
                        onRemove={onRemove}
                        name='Justice League'
                        releaseDate = {new Date()}
                        languaje= 'English'
                        _id='aas34efddcs345456'
                      />)
})
