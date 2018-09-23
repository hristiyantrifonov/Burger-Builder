import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            //Whenever we send a request we clear the old error
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req; //return it so that request continues
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
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