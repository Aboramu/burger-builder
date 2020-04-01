import React, { Component } from 'react';

import Modal from '../../components/UI/Modal';
import Aux from '../Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
  // возвращаем анонимный класс
  return class extends Component {
    state = {
      error: null
    }
    // устанавливаем перехватчики 
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
  
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }
    // закрываем Modal при клике
    errorConfirmedHandler = () => {
      this.setState({error: null});
    }
    // удаляем перехватчики
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return  (
        <Aux>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler} >
              {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;