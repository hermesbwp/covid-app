import React from "react";
import { Navbar } from "react-bulma-components";

function Nav() {
  return (
    <Navbar color="info">
      <Navbar.Brand>
        <Navbar.Item>Title</Navbar.Item>
        <Navbar.Item href="/book">Agendamentos</Navbar.Item>
        <Navbar.Item href="/">Enfermeiro</Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
    </Navbar>
  );
}

export default Nav;
