import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Store } from '../utils/Store';
import CartItem from '../component/CartItem';
import { Message } from '../component/Message';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateQtyHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({ type: 'CART_UPDATE_ITEM_QUANTITY', payload: { ...item, quantity } });
  };

  const removeItemHandler = (id) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: id });
  };

  return (
    <Container>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      {/* Subtotal + Checkout */}
      <Row className="d-flex flex-row-reverse">
        <Col>
          <ListGroup className="mb-2" variant="flush">
            <ListGroup.Item>
              <span className="m-0 lead">
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                items):
                <span className="fw-bold">
                  {' '}
                  ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </span>
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid">
                <Button type="button" variant="primary">
                  Proceed to Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={6} md={8}>
          <Card className="border-0">
            <Card.Title>Shopping Cart</Card.Title>
            {cartItems.length === 0 ? (
              <Message>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </Message>
            ) : (
              <Card className="border-0">
                <Row className="border-bottom">
                  <Col md={10}></Col>
                  <Col className="d-flex flex-row-reverse">
                    <span className="d-none">
                      <p className="m-0 fs-6 fw-lighter">Price</p>
                    </span>
                  </Col>
                </Row>
                {cartItems.map((item) => {
                  return (
                    <CartItem
                      key={item._id}
                      item={item}
                      quantity={item.quantity}
                      removeItem={removeItemHandler}
                      updateQty={updateQtyHandler}
                    />
                  );
                })}
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
