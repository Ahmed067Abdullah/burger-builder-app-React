import React , {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
// import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
// import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
  render(){
      return(
          <Aux>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
          </Aux>
      )
  }
}

export default Layout;