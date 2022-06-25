import { Link } from 'react-router-dom';
import CartItemForm from './CartItemForm';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

const CartItem = (props) => {
  const { item } = props;
  const onClickHandler = () => {
    props.removeItem(item._id);
  };
  return (
    <Row className="p-2 border-bottom">
      <Col md={10} className="">
        <Row>
          <Col md={3} className="d-flex flex-row-reverse">
            <img
              className="img-fluid rounded img-thumbnail"
              src={item.image}
              alt={item.name}
            />
          </Col>
          <Col className="d-flex flex-column">
            <ListGroup>
              <ListGroup.Item className="p-0 border-0">
                <Link to={`/product/${item.slug}`} className="text-decoration-none text-black lead">{item.name}</Link>
              </ListGroup.Item>
              <ListGroup.Item className="p-0 border-0">
                {item.countInStock !== 0 ? (
                  <p className="text-success small">In Stock</p>
                ) : (
                  <p className="text-danger">Unavailable</p>
                )}
              </ListGroup.Item>
            </ListGroup>
            <CartItemForm item={item}  updateQty={props.updateQty}/>
          </Col>
        </Row>
      </Col>
      <Col md={2}>
        <div className="d-flex flex-row-reverse">
          <strong>${item.price.toFixed(2)}</strong>
        </div>
      </Col>
    </Row>
  );
};

export default CartItem;
