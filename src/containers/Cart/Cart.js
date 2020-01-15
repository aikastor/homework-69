import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Card, Table} from "reactstrap";

import './Cart.css';
import {removeItem} from "../../store/actions/cartActions";

class Cart extends Component {
  render() {
    const table = this.props.orderItems.length > 0;
    return (
        <Card>
          Your order:
          <br/>
          {
              <Table size="sm" striped responsive>
                <thead>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {table && this.props.orderItems.map((item, i) =>
                    <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td>{item.name}</td>
                      <td>{item.qnt}</td>
                      <td>
                        <b>{item.totalPrice} </b>
                        <button className='button delete-button'
                                onClick={()=>this.props.deleteOrderItem(item.name, item.totalPrice)}
                        >x
                        </button>
                      </td>
                    </tr>
                )}
                </tbody>
                <tfoot>
                    <tr>
                      <td><b>Delivery</b></td>
                      <td></td>
                      <td></td>
                      <td><b>150</b></td>
                    </tr>
                    <tr>
                      <td><b>Total</b></td>
                      <td></td>
                      <td></td>
                      <td><b>{this.props.totalPrice}</b></td>
                    </tr>
                </tfoot>
              </Table>
          }
          <Button disabled={!table}
                  outline color="success"
          >Place order
          </Button>
        </Card>
    );
  }
}
const mapStateToProps = state => ({
  orderItems: state.cart.orders,
  totalPrice: state.cart.totalPrice,
});
const mapDispatchToProps = dispatch => ({
  deleteOrderItem: (item,price) => dispatch(removeItem(item,price)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Cart);