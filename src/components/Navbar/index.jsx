import React from "react";
import { Navbar } from "react-bulma-components";

function Nav() {
  return (
    <Navbar color="info">
      <Navbar.Brand>
        <Navbar.Item>Title</Navbar.Item>
        <Navbar.Item>Agendamentos</Navbar.Item>
        <Navbar.Item>Enfermeiro</Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
    </Navbar>
  );
}

export default Nav;
