import React from 'react';
import {Card, Col, Row} from "reactstrap";
import './MenuItem.css';

const MenuItem = (props) => {
  return (
      <Card  body outline color="info"
             key={props.name}
             onClick={()=>props.onAddItem()}
             className='Menu-item'>
        <Row>
          <Col xs='4'>
            <div className='Menu-image'>
              <img src={props.image} alt={props.name}/>
            </div>
          </Col>
          <Col xs='8'>
            <div className='Menu-info'>
              <p>
                <span>{props.name}</span>
                <br/>
                <span><b>{props.price}</b> KGS</span>
              </p>
            </div>
          </Col>
        </Row>
      </Card>
  );
};

export default MenuItem;