import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CheckoutSteps = (props) => {
  const navigate = useNavigate();
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
    </Row>
  );
};

export default CheckoutSteps;
