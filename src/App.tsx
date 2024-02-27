import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BookData, NewBookData } from './interfaces'
import { Table, TableBody, TableHeader, Column } from 'react-aria-components'
import ListItem from './components/ListItem'
import AddBook from './components/AddBook'
import { useState } from 'react'

const fetchBooks = async () => {
  const response = await fetch('http://localhost:8000/books')

  return response.json()
}

// App Component
function App() {
  const [newBooks, setNewBooks] = useState<NewBookData>({
    name: '',
    author: '',
    genre: '',
    pages: 0,
    read: false,
  })

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBooks({ ...newBooks, [e.target.name]: e.target.value })
  }

  // Handle Submit
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    data: NewBookData
  ) => {
    e.preventDefault()
    addBookFunc.mutate(data)
  }

  const queryClient = useQueryClient()
  // Fetch books
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({ queryKey: ['books'], queryFn: fetchBooks })

  // Add book
  const addBookFunc = useMutation({
    mutationFn: (newBook: NewBookData) => {
      return fetch('http://localhost:8000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })

  // Delete book
  const deleteBookFunc = useMutation({
    mutationFn: (deleteBook: number) => {
      return fetch(`http://localhost:8000/book/${deleteBook}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <div className='min-h-screen bg-zinc-800'>
        <h1 className='p-5 text-center text-4xl font-bold text-orange-500'>
          Booky
        </h1>
        <AddBook
          newBook={newBooks}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Table
          aria-label='Books'
          className='w-full border-separate border-spacing-y-4 px-5 text-left'>
          <TableHeader className='bg-gray-400 text-orange-900'>
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
              <ListItem key={index} item={book} mutation={deleteBookFunc} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default App
