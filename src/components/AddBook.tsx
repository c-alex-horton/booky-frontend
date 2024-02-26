import {
  Form,
  TextField,
  Label,
  Input,
  Text,
  Button,
} from 'react-aria-components'

const AddBook = () => {
  return (
    <div className='text-center text-orange-500'>
      <h1>Add Book</h1>
      <Form>
        <TextField name='name'>
          <Label>Name</Label>
          <Input />
        </TextField>
        <TextField name='author'>
          <Label>Author</Label>
          <Input />
        </TextField>
        <TextField name='genre'>
          <Label>Genre</Label>
          <Input />
        </TextField>
        <TextField name='pages' type='number'>
          <Label>Pages</Label>
          <Input />
        </TextField>
        <TextField name='read' type='checkbox'>
          <Label>Read</Label>
          <Input />
        </TextField>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default AddBook
