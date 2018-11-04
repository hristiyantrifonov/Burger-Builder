import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index'

class Logout extends Component {

    componentDidMount(){
        this.props.onLogout();
    }

    // Redirecting with declaration (an elegant way)
    // Upon component mount we redirect immediately
    // logout action is dispatch after that
    render(){
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);