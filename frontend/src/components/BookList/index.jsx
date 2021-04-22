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
            <th>Horário</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>
                {book.birthDay.split("-")[2].slice(0, 2)}/
                {book.birthDay.split("-")[1]}/{book.birthDay.split("-")[0]}
              </td>
              <td>
                {book.date.split("-")[2].slice(0, 2)}/{book.date.split("-")[1]}/
                {book.date.split("-")[0]}
              </td>
              <td>{book.date.split("-")[2].slice(3, 8)}</td>
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
