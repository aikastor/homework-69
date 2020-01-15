import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Cart from "./containers/Cart/Cart";
import Menu from "./containers/Menu/Menu";
import './App.css';

const App = () => {
  return (
      <Container className='Container' fluid={true}>
        <Row>
          <Col xs="8"><Menu/></Col>
          <Col xs="4"><Cart/></Col>
        </Row>
      </Container>
  );
};

export default App;