import { Component } from 'react';

export abstract class FormBuilder extends Component {

  constructor(props: any) {
    super(props);
  }

  abstract buildJSXElementFromJson(data: string | any) : any;


  buildCSSString(data: string | any) : string {
    let _styleString = "";
    if(data != undefined) {
      Object.keys(data).forEach((key, index) => {
        _styleString += `${key}:${Object.values(data)[index]};`
      })
    }
    
    return _styleString;
  }

  render(): any {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    )
  }
}
