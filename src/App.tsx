// Import the App.css file
// import './App.css'
import { useQuery } from '@tanstack/react-query'
import { BookData } from './interfaces'

import ListItem from './components/ListItem'

const fetchBooks = async () => {
  const response = await fetch('http://localhost:8000/books')

  return response.json()
}

function App() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({ queryKey: ['books'], queryFn: fetchBooks })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(books)

  return (
    <div>
      {books.map((book: BookData, index: number) => (
        <ListItem key={index} item={book} />
      ))}
    </div>
  )
}

export default App
