import React, {Component} from 'react';
import {loadMenu} from "../../store/actions/menuActions";
import {connect} from "react-redux";
import MenuItem from "../../components/MenuItem/MenuItem";
import './Menu.css';
import {addItem} from "../../store/actions/cartActions";

class Menu extends Component {
  componentDidMount() {
    console.log(this.props.menuItems)
    this.props.onMenuLoad();
  }

  render() {
    return (
        <div className='Menu-container'>
          {Object.keys(this.props.menuItems).map(item=> {
            const lala = item;
            const itemToSend = {};
            itemToSend[lala] = {price: this.props.menuItems[item].price, qnt: 1};
            return (
                <MenuItem name={item}
                          price={this.props.menuItems[item].price}
                          image={this.props.menuItems[item].image}
                          key={item}
                          onAddItem={() => this.props.onAddItem(itemToSend)}
                />
            )
          })}
        </div>

    );
  }
}
const mapStateToProps = state => ({
  menuItems: state.menu.menuItems
});
const mapDispatchToProps = dispatch => ({
  onMenuLoad : () => dispatch(loadMenu()),
  onAddItem : (item) => dispatch(addItem(item))
});

export default connect(mapStateToProps,mapDispatchToProps)(Menu);