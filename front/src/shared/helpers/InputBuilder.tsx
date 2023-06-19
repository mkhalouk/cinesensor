import InputSharedState from "./data/InputSharedState";
import { FormBuilder } from "../components/form-builder/FormBuilder";

class InputBuilder extends FormBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data: any): any {
    const sharedState = InputSharedState.getInstance();

    const { style, attributes } = data;

    const commonProps = {
      style: this.buildCSSString(style),
      id: attributes.id,
      value: attributes.value,
      type: attributes.type,
    };

    const isSubmit = attributes.type === "submit";

    const inputProps = {
      ...(isSubmit ? {} : { name: attributes.name, placeholder: attributes.placeholder }),

      onChange: isSubmit ? undefined : (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        sharedState.setState({ [data.attributes.id]: value });
        console.log(value);
      },
      onClick: isSubmit ? () => {
        const state = sharedState.getState();
        const value = state;
        console.log(value);
      } : undefined
    };

    const _inputElement = <input key={data.label} {...commonProps} {...inputProps} />

    return _inputElement;
  }
}

export default InputBuilder;
