import { RefObject, createRef } from "react";
import { FormBuilder } from "../components/form-builder/FormBuilder";

class InputBuilder extends FormBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data: any): any {
    const inputRef: RefObject<HTMLInputElement> = createRef();

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
      ref: inputRef,
      onChange: isSubmit ? undefined : (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
      },
      onClick: isSubmit ? (event: React.MouseEvent<HTMLInputElement>) => {
        console.log(event)
      } : undefined
    };

    const _inputElement = <input key={data.label} {...commonProps} {...inputProps} />


    return _inputElement;
  }
}

export default InputBuilder;
