import ButtonBuilder from '../../shared/helpers/ButtonBuilder';
import ImageBuilder from '../../shared/helpers/ImageBuilder';

export const createElement = (data: any, props: {}) => {
  if (data.type.toLowerCase() === "button") {
    const _elementbuilder = new ButtonBuilder(props);
    return _elementbuilder.buildJSXElementFromJson(data);
  } else if (data.type.toLowerCase() === "image") {
    const _elementbuilder = new ImageBuilder(props);
    return _elementbuilder.buildJSXElementFromJson(data);
  } else {
    return '';
  }
};
