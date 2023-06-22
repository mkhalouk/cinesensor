import { Component, CSSProperties } from 'react';

interface FormBuilderProps {
  data: string | any;
}

interface FormBuilderState {}

export abstract class FormBuilder extends Component<FormBuilderProps, FormBuilderState> {
  constructor(props: FormBuilderProps) {
    super(props);
  }

  // Provide a default implementation
  buildJSXElementFromJson(__data: string | any, __callback: () => void): JSX.Element {
    throw new Error('You have to implement the method buildJSXElementFromJson!');
  }

  buildCSSString(data: string | any): CSSProperties {
    let _styleObject: CSSProperties | any = {};
    if (data != undefined) {
      Object.entries(data).forEach(([key, value]) => {
        let jsKey = key.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        }); // convert css-style keys to js-style
        _styleObject[jsKey as keyof CSSProperties] = value as string; 
      });
    }

    return _styleObject;
  }

  render(): JSX.Element {
    const jsxElement = this.buildJSXElementFromJson(this.props.data, () => null);
    return jsxElement;
  }
}
