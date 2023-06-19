import ButtonBuilder from '../helpers/ButtonBuilder';
import ImageBuilder from '../helpers/ImageBuilder';
import HeaderBuilder from '../helpers/HeaderBuilder';
import ContainerBuilder from '../helpers/ContainerBuilder';
import InputBuilder from '../helpers/InputBuilder';

export const createElement = (data: any, props: {}) => {
  let _elementbuilder: any = null;
  if (data.type.toLowerCase() === "button") {
    _elementbuilder = new ButtonBuilder(props);
  } 
  else if (data.type.toLowerCase() === "image") {
    _elementbuilder = new ImageBuilder(props);
  } 
  else if (data.type.toLowerCase() === "container") {
    _elementbuilder = new ContainerBuilder(props);
  }
  else if (data.type.toLowerCase() === "header") {
    _elementbuilder = new HeaderBuilder(props);
  }
  else if (data.type.toLowerCase() === "input") {
    _elementbuilder = new InputBuilder(props);
  }
  
  if(_elementbuilder != null) {
    return _elementbuilder.buildJSXElementFromJson(data);
  }
  else {
    // if no suitable builder is found, return null
    return null;
  }
};
