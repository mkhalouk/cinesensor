import { FormBuilder } from "../components/form-builder/FormBuilder";

class InputBuilder extends FormBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data : any) {
    const styles = this.buildCSSString(data.style);
    const attributes = data.attributes;
    let _inputElement = (
      <input 
        style={styles} 
        id={attributes.id} 
        type={attributes.type} 
        name={attributes.name} 
        placeholder={attributes.placeholder}
        value={attributes.value}
      />
    );
    return _inputElement;
  }

}

export default InputBuilder;
