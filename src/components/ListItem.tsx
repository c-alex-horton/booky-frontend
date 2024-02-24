import React from 'react'
import { BookData } from '../interfaces'
import { Cell, Row, Button } from 'react-aria-components'

type MutationFunction = {
  mutate: (id: number) => void
}

type ListItemProps = {
  item: BookData
  mutation: MutationFunction
}

const ListItem: React.FC<ListItemProps> = ({ item, mutation }) => {
  return (
    <Row className='bg-zinc-700 rounded-lg shadow text-orange-500 hover:bg-zinc-600'>
      <Cell className='rounded-l-lg p-4'>{item.name}</Cell>
      <Cell className='p-4'>{item.author}</Cell>
      <Cell className='p-4'>{item.genre}</Cell>
      <Cell className='p-4'>{item.pages}</Cell>
      <Cell className='p-4'>{item.read ? 'Yes' : 'No'}</Cell>
      <Cell className='rounded-r-lg '>
        <Button
          className='bg-orange-500 hover:bg-orange-600 text-zinc-800 p-2 rounded-lg'
          onPress={() => {
            mutation.mutate(item.id)
          }}>
          Delete
        </Button>
      </Cell>
    </Row>
  )
}

export default ListItem
