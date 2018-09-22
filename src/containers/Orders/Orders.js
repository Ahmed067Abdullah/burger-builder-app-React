import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component{
    
    state = {
        orders : [],
        loading : true
    }

    componentDidMount () {
        axios.get('orders.json')
            .then(res => {
                let fetchedOrders = [];
                console.log(res)
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id : key
                    });
                }
                console.log(fetchedOrders)
                this.setState({loading : false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading : false})
            })
    }

    render(){
        console.log(this.state.orders);
        const orders = this.state.orders.map((order) =>{
            return <Order 
                        key = {order.id} 
                        ingredients = {order.ingredients}
                        price = {order.price}/>
        });
        return (
            <div>
                {orders}
            </div>    
        )
    }
}

export default withErrorHandler(Orders,axios);