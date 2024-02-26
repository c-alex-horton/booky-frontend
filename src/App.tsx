import './App.css'
import { useQuery, useMutation } from '@tanstack/react-query'
import { BookData } from './interfaces'
import { Table, TableBody, TableHeader, Column } from 'react-aria-components'
import ListItem from './components/ListItem'
import AddBook from './components/AddBook'

const fetchBooks = async () => {
  console.log('fetchBooks' + import.meta.env.VITE_APP_URL)

  const response = await fetch('http://localhost:8000/books')

  return response.json()
}

function App() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({ queryKey: ['books'], queryFn: fetchBooks })

  const mutation = useMutation({
    mutationFn: (deleteBook: number) => {
      console.log(deleteBook)
      return fetch(`http://localhost:8000/book/${deleteBook}`, {
        method: 'DELETE',
      })
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(books)

  return (
    <>
      <div className='bg-zinc-800 min-h-screen'>
        <h1 className='text-4xl font-bold text-center p-5 text-orange-500'>
          Booky
        </h1>
        <AddBook />
        <Table
          aria-label='Books'
          className='w-full text-left border-separate border-spacing-y-4 px-5'>
          <TableHeader className='bg-gray-500 text-orange-900'>
            <Column isRowHeader className={'p-3'}>
              Name
            </Column>
            <Column className={'p-3'}>Author</Column>
            <Column className={'p-3'}>Genre</Column>
            <Column className={'p-3'}>Pages</Column>
            <Column className={'p-3'}>Read</Column>
            <Column className={'p-3'}></Column>
          </TableHeader>
          <TableBody className='p-5'>
            {books.map((book: BookData, index: number) => (
              <ListItem key={index} item={book} mutation={mutation} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default App
