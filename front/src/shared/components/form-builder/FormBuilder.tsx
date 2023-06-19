import { Component, CSSProperties } from 'react';

export abstract class FormBuilder extends Component{

  constructor(props: any) {
    super(props);
  }

  // Provide a default implementation
  buildJSXElementFromJson(data: string | any) : JSX.Element {
    throw new Error('You have to implement the method buildJSXElementFromJson!');
  };


  buildCSSString(data: string | any): CSSProperties {
    let _styleObject: CSSProperties = {};
    if (data != undefined) {
      Object.entries(data).forEach(([key, value]) => {
        let jsKey = key.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        }); // convert css-style keys to js-style
        _styleObject[jsKey as keyof CSSProperties] = value;
      });
    }

    return _styleObject;
  }

  render(): JSX.Element {
    const jsxElement = this.buildJSXElementFromJson(this.props.data);
    return jsxElement;
  }
}
