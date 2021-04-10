import React from "react";
import { Container, Card } from "rbx";
import "./index.css";

// import { Container } from './styles';

function CardComponent({ children }) {
  return (
    <Container>
      <Card>{children}</Card>
    </Container>
  );
}

export default CardComponent;
