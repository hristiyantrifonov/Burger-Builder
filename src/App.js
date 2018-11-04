import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

    // Using the auth check state function to keep the state
    componentDidMount(){
        this.props.onTryAutoSignup();
    }

    render() {

        // GUARDING ROUTES
        // The routing setup for unauthenticated users
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/" component={BurgerBuilder}/>
            </Switch>
        );

        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" component={BurgerBuilder}/>
                </Switch>
            );
        }

        return (
          <div>
              <Layout>
                  {routes}
              </Layout>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
