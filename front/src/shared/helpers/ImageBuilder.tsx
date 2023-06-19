import { FormBuilder } from "../components/form-builder/FormBuilder";

class ImageBuilder extends FormBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data: string | any): JSX.Element {
    const { src, alt } = data.properties;
    return <img src={src} alt={alt} />;
  }
}

export default ImageBuilder;
