import { WidgetBuilder } from "../components/widget-builder/WidgetBuilder";

class ButtonBuilder extends WidgetBuilder {
  constructor(props: any) {
    super(props);
  }

  buildJSXElementFromJson(data: string | any): JSX.Element {
    const _buttonElement = (
      <button onClick={() => new Function(data.properties.onClick)()} style={super.buildCSSString(data.style)}>
        {data.value}
      </button>
    );
    return _buttonElement;
  }
}

export default ButtonBuilder;
