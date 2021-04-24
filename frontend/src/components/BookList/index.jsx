import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bulma-components";
import axios from "../../utils/api";
import "./index.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    try {
      const res = await axios.get("/book");
      setBooks(res.data.books);
      console.log(books);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleRemove = async ({ _id }) => {
    const newBooks = books.filter((book) => book._id !== _id);

    try {
      await axios.delete(`/book/${_id}`);
      setBooks(newBooks);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnClick = async (bookEdit) => {
    const isVaccinated = true;
    const newBooks = books.map((book) => {
      if (book._id === bookEdit._id) {
        return {
          ...book,
          isVaccinated,
        };
      }

      return book;
    });

    try {
      await axios.put(`/book/${bookEdit._id}`, { ...bookEdit, isVaccinated });
      setBooks(newBooks);
      console.log(bookEdit.isVaccinated);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      <Table color="info">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Horário</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>
                {book.date.split("-")[2].slice(0, 2)}/{book.date.split("-")[1]}/
                {book.date.split("-")[0]}
              </td>
              <td>{book.date.split("-")[2].slice(3, 8)}</td>
              <td>
                {book.isVaccinated ? (
                  <div>vacinado</div>
                ) : (
                  <div>
                    <Button
                      color="success"
                      onClick={() => handleOnClick(book)}
                      className="btn-box"
                    >
                      Atendido
                    </Button>
                    <Button color="danger" onClick={() => handleRemove(book)}>
                      Faltou
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookList;
