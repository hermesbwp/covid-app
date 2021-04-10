import React from "react";
import BookForm from "../../components/Book/BookForm";
import NavBar from "../../components/Navbar";
import Card from "../../components/Card";
function Book() {
  return (
    <div>
      <NavBar />
      <Card>
        <BookForm />
      </Card>
    </div>
  );
}

export default Book;
