import { Component } from 'react'
import { readFormElements } from '../../shared/utils/JsonReader';
import data from '../../assets/json/login-form-v1.json';
import { createElement } from '../../shared/utils/ElementCreator';

class Login extends Component {
    constructor(props: any) {
        super(props);
        this.state = { elements: [] };
    }

    componentDidMount() {
        const _elements = readFormElements(data, (data: any) => {
          const element = createElement(data, {});
          return element;
        });
        this.setState({ elements: _elements });
      }

    render() {
        return (
            <>
                {this.state.elements}
            </>
        )
    }
}


export default Login
