import React, {Component} from 'react';
import {connect} from "react-redux";
import {Card, Table} from "reactstrap";

import './Cart.css';
import {decreaseQnt, increaseQnt, removeItem} from "../../store/actions/cartActions";
import PlaceOrderModal from "../../components/PlaceOrderModal/PlaceOrderModal";

class Cart extends Component {
  render() {
    const table = this.props.orderItems.length > 0;
    return (
        <Card className='Cart'>
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
                      <td>
                        {item.name}
                      </td>
                      <td>
                        <button className='button delete-button'
                                onClick={()=>this.props.increase(item.name, item.price)}
                        >▴</button>
                        {item.qnt}
                        <button className='button delete-button'
                                onClick={()=>this.props.decrease(item.name, item.price)}
                        >▾</button>
                      </td>
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
          <PlaceOrderModal
              table={!table}
              initialModalState={false}/>
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
  increase: (name, price)=> dispatch(increaseQnt(name, price)),
  decrease: (name, price)=> dispatch(decreaseQnt(name, price)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Cart);