import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            //Whenever we send a request we clear the old error
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req; //return it so that request continues
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        //When we wrap the error handler around multiple components
        //the interceptors we set still will exist, thus leaking memory
        //or potentially could lead to error or change of state
        //Thus when the component is not needed we remove them
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorModalDismissedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorModalDismissedHandler}>

                        {/*the message property is part of the vanilla error object*/}
                        {this.state.error ? this.state.error.message : null}

                    </Modal>
                    {/*...props makes sure we do not lose them as we copy all*/}
                    <WrappedComponent {...this.props} />
                </Aux>

            );
        }
    }

}

export default withErrorHandler;