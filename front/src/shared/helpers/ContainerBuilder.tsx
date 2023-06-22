import React from 'react';
import { WidgetBuilder } from "../components/widget-builder/WidgetBuilder";
import { createElement } from "../utils/ElementCreator"; // correct import paths
import { readWidgetElements } from "../utils/JsonReader"; // correct import paths

class ContainerBuilder extends WidgetBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data: string | any, __callback : () => void): any {
    const style = super.buildCSSString(data.style);
    const childElements = readWidgetElements(data.child, (data: any) => createElement(data, {}, __callback));

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
