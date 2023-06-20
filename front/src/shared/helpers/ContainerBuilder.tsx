import React from 'react';
import { FormBuilder } from "../components/form-builder/FormBuilder";
import { createElement } from "../utils/ElementCreator"; // correct import paths
import { readFormElements } from "../utils/JsonReader"; // correct import paths

class ContainerBuilder extends FormBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data: string | any, __callback : () => void): any {
    const style = super.buildCSSString(data.style);
    const childElements = readFormElements(data.child, (data: any) => createElement(data, {}, __callback));

    // Return a JSX div with children
    return (
      <div style={style}>
        {childElements.map((ChildElement, index) => (
          <React.Fragment key={index}>
            {ChildElement}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default ContainerBuilder;
