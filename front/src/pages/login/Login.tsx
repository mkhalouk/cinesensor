import { Component } from 'react';
import { readWidgetElements } from '../../shared/utils/JsonReader';
import data from '../../assets/json/login-form-v1.json';
import { createElement } from '../../shared/utils/ElementCreator';
import ILoginService from '../../services/IUserService';
import serviceData from '../../assets/json/dataservice/login-service-data.json';
import LoginServiceImpl from '../../services/impl/UserServiceImpl';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

interface LoginState {
  elements: any[];
  redirect: boolean; 
}

class Login extends Component<{}, LoginState> {
  private loginService: ILoginService;
  
  constructor(props: {}) {
    super(props);
    this.loginService = new LoginServiceImpl();
    this.state = { elements: [], redirect: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCookieAndRedirect = this.setCookieAndRedirect.bind(this);
  }

  async handleSubmit() {
    await this.loginService.login(serviceData, this.setCookieAndRedirect);
  }

  setCookieAndRedirect(key: string, value: string): void {
    Cookies.set(key, value, { path: '/', sameSite: 'Strict' });
    this.setState({ redirect: true });
  }

  componentDidMount() {
    const _elements = readWidgetElements(data, (data: any) => {
      const element = createElement(data, {}, this.handleSubmit);
      return element;
    });

    this.setState({ elements: _elements, redirect: Cookies.get('username') != undefined });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/dashboard" replace={true} />;
    } else {
      return <>{this.state.elements}</>;
    }
  }
}

export default Login;
