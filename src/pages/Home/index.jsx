import React from "react";
import NavBar from "../../components/Navbar";
import BookList from "../../components/BookList";
import Card from "../../components/Card";

function Home() {
  return (
    <>
      <NavBar />
      <Card>
        <BookList />
      </Card>
    </>
  );
}

export default Home;
