import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const CreateBook = ({ APIURL, handleCloseAddModal, getAllBooks }) => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const handleAdd = () => {
    const newBook = {
      title,
      author,
      publishYear,
    };

    axios.post(APIURL, newBook).then((res) => {
      if (res.data) {
        handleCloseAddModal();
        alert(res.data.message);
        getAllBooks();
      } else {
        console.log(res);
        console.log(res.error);
      }
    });
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd();
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Book Title</Form.Label>
        <Form.Control
          required
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Author"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Publish Year</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Publish Year"
          pattern="[0-9]*"
          title="Please enter numbers only"
          id="publishYear"
          name="publishYear"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default CreateBook;
