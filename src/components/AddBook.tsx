import { Form, TextField, Label, Input, Button } from 'react-aria-components'
import { NewBookData } from '../interfaces'
import React from 'react'

type AddBookProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  newBook: NewBookData
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, data: NewBookData) => void
}

const AddBook: React.FC<AddBookProps> = ({
  newBook,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className='flex flex-col items-center justify-center text-center text-orange-300'>
      <h1 className='text-2xl'>Add Book</h1>
      <Form
        onSubmit={(e) => {
          handleSubmit(e, newBook)
        }}
        className='w-48 [&_input]:rounded-lg [&_input]:bg-zinc-700
      [&_input]:p-2 [&_input]:text-orange-500 '>
        <TextField name='name'>
          <Label>Name</Label>
          <Input value={newBook.name || ''} onChange={handleChange} />
        </TextField>
        <TextField name='author'>
          <Label>Author</Label>
          <Input value={newBook.author || ''} onChange={handleChange} />
        </TextField>
        <TextField name='genre'>
          <Label>Genre</Label>
          <Input value={newBook.genre || ''} onChange={handleChange} />
        </TextField>
        <TextField name='pages' type='number'>
          <Label>Pages</Label>
          <Input value={newBook.pages} onChange={handleChange} />
        </TextField>
        <TextField name='read' type='checkbox'>
          <Label>Read</Label>
          <Input className={'w- ml-2'} />
        </TextField>
        <Button
          type='submit'
          className={'rounded-lg bg-orange-500 p-3 text-zinc-700'}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddBook
