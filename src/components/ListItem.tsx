import React from 'react'
import { BookData } from '../interfaces'

type ListItemProps = {
  item: BookData
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <li>
      {item.name} - {item.author}
    </li>
  )
}

export default ListItem
