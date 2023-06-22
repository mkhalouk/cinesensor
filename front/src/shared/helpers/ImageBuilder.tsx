import { WidgetBuilder } from "../components/widget-builder/WidgetBuilder";

class ImageBuilder extends WidgetBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data: string | any): JSX.Element {
    const { src, alt } = data.properties;
    return <img src={src} alt={alt} />;
  }
}

export default ImageBuilder;
