import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import Toast and ToastContainer components

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { CiViewTimeline } from "react-icons/ci";
import { SiAddthis } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ViewBook from "../components/ViewBook";
import EditBook from "../components/EditBook";
import CreateBook from "../components/CreateBook";

const APIURL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:5555/books"
    : import.meta.env.VITE_BASE_API;

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [bookID, setBookID] = useState("");
  const [editData, setEditData] = useState({});

  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Use useCallback to memoize the functions to avoid unnecessary re-renders
  const handleShowAddModal = useCallback(() => setShowAddModal(true), []);
  const handleCloseAddModal = useCallback(() => setShowAddModal(false), []);

  const handleShowViewModal = useCallback(() => setShowViewModal(true), []);
  const handleCloseViewModal = useCallback(() => setShowViewModal(false), []);

  const handleShowEditModal = useCallback(() => setShowEditModal(true), []);
  const handleCloseEditModal = useCallback(() => setShowEditModal(false), []);

  const handleShowDeleteModal = useCallback(() => setShowDeleteModal(true), []);
  const handleCloseDeleteModal = useCallback(
    () => setShowDeleteModal(false),
    []
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${APIURL}/${id}`).then((res) => {
        if (res.data) {
          toast.success(res.data.message); // Show success toast
          getAllBooks();
        } else {
          console.log(res.error);
        }
      });
      // Redirect to a page after successful deletion
      navigate("/"); // Redirect to the books listing page or any other route
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book"); // Show error toast
    }
  };

  const getAllBooks = () => {
    setLoading(true);
    axios.get(APIURL).then((res) => {
      if (res.data) {
        setBooks(res.data.data);
        setLoading(false);
      } else {
        console.log(res.error);
      }
    });
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      {/* Toast Container */}
      <div>
        {loading ? (
          <h1 className="text-danger">LOADING...</h1>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center my-3">
              <h1>Welcome to the Book Store</h1>
              <SiAddthis className="add-btn" onClick={handleShowAddModal} />
            </div>
            <div className="row">
              {books.length > 0 ? (
                books?.map((book) => (
                  <div
                    key={book._id}
                    className="col-md-3 col-lg-4 col-sm-12 m-2 book-card d-flex justify-content-between"
                  >
                    <div>
                      <strong>{book.title}</strong>
                      <p>{book.author}</p>
                      <p>{book.publishYear}</p>
                    </div>
                    <div className="button-card">
                      <CiViewTimeline
                        className="card-buttons"
                        onClick={() => {
                          handleShowViewModal();
                          setBookID(book._id);
                        }}
                      />
                      <AiOutlineEdit
                        className="card-buttons"
                        onClick={() => {
                          handleShowEditModal();
                          setEditData(book);
                        }}
                      />
                      <AiOutlineDelete
                        className="card-buttons text-danger"
                        onClick={() => {
                          handleShowDeleteModal();
                          setBookID(book._id);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div>No Books</div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBook
            APIURL={APIURL}
            handleCloseAddModal={handleCloseAddModal}
            getAllBooks={getAllBooks}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* View Modal */}
      <Modal
        show={showViewModal}
        onHide={handleCloseViewModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewBook id={bookID} APIURL={APIURL} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditBook
            editData={editData}
            APIURL={APIURL}
            handleCloseEditModal={handleCloseEditModal}
            getAllBooks={getAllBooks}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger">
            Are you sure you want to delete this book?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(bookID);
              handleCloseDeleteModal();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
