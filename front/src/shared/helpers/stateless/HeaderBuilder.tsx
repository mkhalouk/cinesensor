import { FormBuilder } from "../../components/form-builder/FormBuilder";

class HeaderBuilder extends FormBuilder {

    constructor(props: any) {
        super(props);
    }

    buildJSXElementFromJson(data: string | any): any {
        const _buttonString = `<${data.tag} style="${super.buildCSSString(data.style)}" >${data.value}</${data.tag}>`;
        return _buttonString;
    }
}

export default HeaderBuilder;
