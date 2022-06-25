import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { Store } from '../utils/Store';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';

const CartItemForm = (props) => {
  const { item } = props;
  const [qty, setQty] = useState('');
  const [showNumInput, setShowNumInput] = useState(false);

  const qtyHandler = (e) => {
    setQty(e);
  };

  const checkQtyHandler = async () => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    console.log(`Current Qty is ${data.quantity}`);
  }
  
  const showNumInputHandler = () => {
    setShowNumInput(true);
  };

  useEffect(() => {
    props.updateQty(item);
    
  }, [qty]);

  return (
    <Row>
      <Col md={4}>
        {showNumInput ? (
          <Form>
            <InputGroup size="sm">
              <Form.Control type="text" placeholder={item.quantity} />
              <Button variant="warning border border-1" onClick={qtyHandler}>
                <p className="m-0 small fw-lighter">Update</p>
              </Button>
            </InputGroup>
          </Form>
        ) : (
          <Dropdown className="dt d-inline-flex" onSelect={qtyHandler}>
            <Dropdown.Toggle variant="light" size="sm">
              Qty: {qty}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dm" variant="light">
              <Dropdown.Item eventKey="0">0 (delete)</Dropdown.Item>
              <Dropdown.Item eventKey="1">1</Dropdown.Item>
              <Dropdown.Item eventKey="2">2</Dropdown.Item>
              <Dropdown.Item eventKey="3">3</Dropdown.Item>
              <Dropdown.Item eventKey="4">4</Dropdown.Item>
              <Dropdown.Item onClick={showNumInputHandler}>5+</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Col>
      <Col>
          <Button onClick={checkQtyHandler}>Check Qty</Button>
      </Col>
    </Row>
  );
};

export default CartItemForm;
