import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bulma-components";
import axios from "../../utils/api";
import "./index.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    try {
      const res = await axios.get("/books");
      setBooks(res.data);
      console.log(books);
    } catch (e) {
      console.log(e);
    }
  };
  const getAge = (time) => {
    const today = new Date();
    const birthDay = new Date(time);
    const age = today.getUTCFullYear() - birthDay.getUTCFullYear();
    if (birthDay.getMonth < today.getMonth()) {
      return age;
    } else if (birthDay.getMonth() === today.getMonth()) {
      if (birthDay.getDay() < today.getDay()) {
        return age;
      } else return age - 1;
    } else return age - 1;
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Table color="info">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{getAge(book.birthDay)}</td>
              <td>{book.date}</td>
              <td>
                <Button color="success" className="btn-box">
                  Atendido
                </Button>
                <Button color="danger">Faltou</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookList;
