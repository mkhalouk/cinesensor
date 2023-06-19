import React from 'react';
import { FormBuilder } from "../components/form-builder/FormBuilder";

class HeaderBuilder extends FormBuilder {
    constructor(props: any) {
        super(props);
    }

    buildJSXElementFromJson(data: string | any): JSX.Element {
        const { tag, value, style } = data;

        // Pass the style string directly to the style attribute
        return React.createElement(tag, { style: super.buildCSSString(style) }, value);
    }
}

export default HeaderBuilder;
