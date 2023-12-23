import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const EditBook = ({ editData, APIURL ,getAllBooks , handleCloseEditModal}) => {

  const [title, setTitle] = useState(editData ? editData.title : "");
  const [author, setAuthor] = useState(editData ? editData.author : "");
  const [publishYear, setPublishYear] = useState(
    editData ? editData.publishYear : ""
  );
const handleEdit =async () =>{
  const editedBook = {
    title,
    author,
    publishYear,
  };

await axios.put(`${APIURL}/${editData?._id}`, editedBook).then((res) => {
  if (res.data) {
    handleCloseEditModal();
    alert(res.data.message);
    getAllBooks();
  } else {
    console.log(res);
    console.log(res.error);
  }
})
}
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit();
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
        Edit
      </Button>
    </Form>
  );
};

export default EditBook;
