import ButtonBuilder from '../helpers/stateful/ButtonBuilder';
import ImageBuilder from '../helpers/stateless/ImageBuilder';
import HeaderBuilder from '../helpers/stateless/HeaderBuilder';
import ContainerBuilder from '../helpers/stateless/ContainerBuilder';
import InputBuilder from '../helpers/stateful/InputBuilder';

export const createElement = (data: any, props: {}) => {
  let _elementbuilder: any = null;
  if (data.type.toLowerCase() === "button") {
    _elementbuilder = new ButtonBuilder(props);
    return _elementbuilder.buildJSXElementFromJson(data);
  } if (data.type.toLowerCase() === "image") {
    _elementbuilder = new ImageBuilder(props);
  } 
  if (data.type.toLowerCase() === "container") {
    _elementbuilder = new ContainerBuilder(props);
  }
  if (data.type.toLowerCase() === "header") {
    _elementbuilder = new HeaderBuilder(props);
  }
  if (data.type.toLowerCase() === "input") {
    _elementbuilder = new InputBuilder(props, data);
  }
  if(_elementbuilder != null) {
    return _elementbuilder.buildJSXElementFromJson(data);
  }
};
