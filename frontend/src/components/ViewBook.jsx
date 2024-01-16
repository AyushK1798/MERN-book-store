import axios from "axios";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import BookImage from "../assets/book-img.webp";

const ViewBook = (props) => {
  const { id } = props;
  console.log(id)
  console.log(typeof(id))
  // const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [viewBook, setViewBook] = useState({});

  useEffect(() => {
    getBook(id);
  }, [id]);

  const getBook = (id) => {
    axios.get(`https://mern-book-store-backend-3dd914fjk-ayushk1798.vercel.app/books/${id}`).then((res) => {
      if (res.data) {
        setViewBook(res.data);
        setLoading(false);
      } else {
        console.log(res.error);
      }
    });
  };
  return (
    <div>
      {loading ? (
        <h1 className="text-danger">Loading...</h1>
      ) : (
        <div>
          {!viewBook ? (
            <p>Book Not Found</p>
          ) : (
            <div className="d-flex align-items-center gap-3" key={viewBook._id}>
              <div>
                <img src={BookImage} alt="" className="book-image" />
              </div>
              <div>
                <strong>{viewBook.title}</strong>

                <p>{viewBook.author}</p>
                <p>{viewBook.publishYear}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewBook;
