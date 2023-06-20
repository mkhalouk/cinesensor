import { Component } from 'react'
import { readFormElements } from '../../shared/utils/JsonReader';
import data from '../../assets/json/login-form-v1.json';
import { createElement } from '../../shared/utils/ElementCreator';
import ILoginService from '../../services/ILoginService';
import serviceData from '../../assets/json/dataservice/login-service-data.json';
import LoginServiceImpl from '../../services/impl/LoginServiceImpl';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';




class Login extends Component {
    private loginService: ILoginService;
    constructor(props: any) {
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
        Cookies.set(key, value);
        this.setState({redirect: true});
    }

    componentDidMount() {
        const _elements = readFormElements(data, (data: any) => {
            const element = createElement(data, {}, this.handleSubmit);
            return element;
        });

        this.setState({ elements: _elements, redirect : Cookies.get('username') != undefined});
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/dashboard" replace={true} />;
        } else {
            return (
                <>
                    {this.state.elements}
                </>
            )
        }
    }
}


export default Login
