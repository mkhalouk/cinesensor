import InputSharedState from "./data/InputSharedState";
import { FormBuilder } from "../components/form-builder/FormBuilder";

class InputBuilder extends FormBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data: any, __callback : () => void): any {
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
      },
      onClick: isSubmit ? () => {
        __callback!()
      } : undefined
    };

    const _inputElement = <input  {...commonProps} {...inputProps} />

    return _inputElement;
  }
}

export default InputBuilder;
