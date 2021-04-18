import React, { Children } from "react";
import Nav from "../Navbar";
import Card from "../Card";

// import { Container } from './styles';

function Page() {
  return (
    <>
      <Nav />
      <Card>{Children}</Card>
    </>
  );
}

export default Page;
