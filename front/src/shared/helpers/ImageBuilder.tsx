import { FormBuilder } from "../components/form-builder/FormBuilder";

class ImageBuilder extends FormBuilder {

    constructor(props: any) {
        super(props);
    }

    buildJSXElementFromJson(data: string | any): any {
        const _imageString = `<img src="${data.properties.src}" alt="${data.properties.alt}" />`;
        return _imageString;
    }
}

export default ImageBuilder;
