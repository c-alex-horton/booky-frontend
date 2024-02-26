import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BookData } from './interfaces'
import { Table, TableBody, TableHeader, Column } from 'react-aria-components'
import ListItem from './components/ListItem'
import AddBook from './components/AddBook'

const fetchBooks = async () => {
  const response = await fetch('http://localhost:8000/books')

  return response.json()
}

// App Component
function App() {
  const queryClient = useQueryClient()
  // Fetch books
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({ queryKey: ['books'], queryFn: fetchBooks })

  // // Delete book
  // const useDeleteBook = () => {
  //   return useMutation({
  //     mutationFn: (deleteBook: number) => {
  //       return fetch(`http://localhost:8000/book/${deleteBook}`, {
  //         method: 'DELETE',
  //       })
  //     },
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: ['books'] })
  //     },
  //   })
  // }
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
              <ListItem key={index} item={book} mutation={deleteBookFunc} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default App
