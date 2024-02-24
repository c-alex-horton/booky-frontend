import React from 'react'
import { BookData } from '../interfaces'
import { Cell, Row } from 'react-aria-components'

type ListItemProps = {
  item: BookData
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <Row className='bg-zinc-700 rounded-lg shadow text-orange-500 hover:bg-zinc-600'>
      <Cell className='rounded-l-lg p-4'>{item.name}</Cell>
      <Cell className='p-4'>{item.author}</Cell>
      <Cell className='p-4'>{item.genre}</Cell>
      <Cell className='p-4'>{item.pages}</Cell>
      <Cell className='rounded-r-lg p-4'>{item.read ? 'Yes' : 'No'}</Cell>
    </Row>
  )
}

export default ListItem
