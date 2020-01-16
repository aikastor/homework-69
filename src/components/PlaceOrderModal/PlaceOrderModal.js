import React, {Component} from 'react';
import {
  Alert,
  Button, Col,
  Form,
  FormGroup, Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Spinner
} from "reactstrap";
import {createOrder, initCart} from "../../store/actions/cartActions";
import {connect} from "react-redux";

class PlaceOrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      name: '',
      phone: '',
      address: '',
      ordered: false,
    };

  }

  toggleModal =()=> {
    this.setState({
      modal: !this.state.modal
    })
  };
  toggleAlert =()=>{
    this.setState({ordered:true},()=>{
      window.setTimeout(()=>{
        this.setState({ordered:false})
      },4000)
    });
  };

  onChange =e=>
    this.setState({[e.target.name]: e.target.value});

  submitOrderHandler = async (e) =>{
    e.preventDefault();

    let filteredOrder = this.props.order.map(i=> {
      return  {name: i.name, qnt: i.qnt}
    });

    let order = {
      order: filteredOrder,
      customer: {
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
      }
    };

    await this.props.placeOrder(order);
    this.toggleModal();
    this.toggleAlert();
    this.props.initCart();
  };

  render() {
    let form = (
        <Form onSubmit={e=>this.submitOrderHandler(e)}>
          <FormGroup row>
            <Label for="name" sm={2}>Name:</Label>
            <Col sm={10}>
              <Input type="text" name="name" id="name" required
                     placeholder="Enter your name" onChange={e=>this.onChange(e)} />
             </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="phone" sm={2}>Phone</Label>
              <Col sm={10}>
                <Input type="phone" name="phone" id="phone" required
                       placeholder="Enter your phone" onChange={e=>this.onChange(e)}/>
              </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address" sm={2}>Address:</Label>
            <Col sm={10}>
              <Input type="text" name="address" id="address" required
                     placeholder="Enter your address" onChange={e=>this.onChange(e)}/>
            </Col>
          </FormGroup>
          <Button color="primary">Do Something</Button>{' '}
        </Form>
    );

    let modal = (
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Enter your info</ModalHeader>
          <ModalBody>
            {this.props.placingOrder ?
                <Spinner style={{ width: '3rem', height: '3rem' }}/>
                :
                form
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>);

    return (
        <div>
          <Alert color="success" isOpen={this.state.ordered}>
            Order successfully placed!
          </Alert>
          <Button disabled={this.props.table}
                  outline color="success"
                  onClick={this.toggleModal}
          >Place order
          </Button>
          {modal}
        </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.cart.orders,
  placingOrder: state.cart.ordering,
});

const mapDispatchToProps = dispatch=> ({
  placeOrder: order=> dispatch(createOrder(order)),
  initCart: ()=> dispatch(initCart()),
});
export default connect(mapStateToProps,mapDispatchToProps)(PlaceOrderModal);