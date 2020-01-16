import React, {Component} from 'react';
import {loadMenu} from "../../store/actions/menuActions";
import {connect} from "react-redux";
import MenuItem from "../../components/MenuItem/MenuItem";
import './Menu.css';
import {addItem} from "../../store/actions/cartActions";
import {Spinner} from "reactstrap";

class Menu extends Component {
  componentDidMount() {
    this.props.onMenuLoad();
  }

  render() {
    return (
        <div className='Menu-container'>
          {!this.props.loading ?
            Object.keys(this.props.menuItems).map(item=> {
                let price = this.props.menuItems[item].price;
                return (
                    <MenuItem name={item}
                              price={price}
                              image={this.props.menuItems[item].image}
                              key={item}
                              onAddItem={() => this.props.onAddItem({name: item, qnt: 1, price: price, totalPrice: price})}
                    />
                )
              })
              :
              <Spinner/>
          }
        </div>
    );
  }
}
const mapStateToProps = state => ({
  menuItems: state.menu.menuItems,
  loading: state.menu.loading,
});
const mapDispatchToProps = dispatch => ({
  onMenuLoad : () => dispatch(loadMenu()),
  onAddItem : (item) => dispatch(addItem(item))
});

export default connect(mapStateToProps,mapDispatchToProps)(Menu);