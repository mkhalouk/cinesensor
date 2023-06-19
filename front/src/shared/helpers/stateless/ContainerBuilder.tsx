import { FormBuilder } from "../../components/form-builder/FormBuilder";
import { createElement } from "../../utils/ElementCreator";
import { readFormElements } from "../../utils/JsonReader";

class ContainerBuilder extends FormBuilder {

    constructor(props: any) {
        super(props);
    }

    buildJSXElementFromJson(data: string | any): any {
        const _buttonString = `<div style="${super.buildCSSString(data.style)}" >${readFormElements(data.child,  (data: any) => createElement(data, {}))}</div>`;
        return _buttonString;
    }
}

export default ContainerBuilder;
