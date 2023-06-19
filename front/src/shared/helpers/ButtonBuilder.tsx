import { FormBuilder } from "../components/form-builder/FormBuilder";

class ButtonBuilder extends FormBuilder {

    constructor(props: any) {
        super(props);
    }

    buildJSXElementFromJson(data: string | any): any {
        const _buttonString = `<button value="${data.properties.value}" onClick="${data.properties.onClick}" style="${super.buildCSSString(data.style)}" >${data.value}</button>`;
        return _buttonString;
    }
}

export default ButtonBuilder;
