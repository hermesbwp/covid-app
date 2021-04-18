import React from "react";
import { Container, Card } from "react-bulma-components";
import "./index.css";

// import { Container } from './styles';

function CardComponent({ title, children }) {
  return (
    <Container>
      <Card>
        <Card.Header className="header">{title}</Card.Header>
        <Card.Content>{children}</Card.Content>
      </Card>
    </Container>
  );
}

export default CardComponent;
