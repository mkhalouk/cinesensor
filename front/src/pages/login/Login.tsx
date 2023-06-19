import { Component } from 'react'
import { readFormElements } from '../../shared/utils/JsonReader';
import data from '../../assets/json/login-form-v1.json';
import { createElement } from '../../shared/utils/ElementCreator';
import { FormBuilder } from '../../shared/components/form-builder/FormBuilder';



class Login extends Component {
    constructor(props: any) {
        super(props);
        this.state = { content: "<div>content</div>" };
    }

    componentDidMount() {
        const _JsxString = readFormElements(data, (data: any) => createElement(data, {}));
        this.setState({ content: _JsxString });
    }

    render() {
        return (
            <>
                <FormBuilder html={this.state.content} />
            </>
        )
    }
}


export default Login
