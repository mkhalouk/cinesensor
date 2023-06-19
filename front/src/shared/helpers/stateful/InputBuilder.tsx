import { FormBuilder } from "../../components/form-builder/FormBuilder";
interface InputProps {
    data: any;
}

class InputBuilder extends FormBuilder {

    data: any;

    constructor(props: any, data: any) {
        super(props);
        this.data = data;
        (window as any).handleClick_2a8ad9ebae0b = this.handleClick_2a8ad9ebae0b;
    }



    handleClick_2a8ad9ebae0b = (evt: any) => {
        document.getElementById('submit_input')?.addEventListener("click", (event: any) => {
            console.log(event)
        });
    }

    buildAttributes(attributes: any): string {
        let attributesString = '';
        Object.keys(attributes).forEach(key => {
            attributesString += `${key}="${attributes[key]}"`
        });
        return attributesString;
    }

    buildEventListeners(events: any): string {

        let eventString = '';
        if (events != undefined) {
            Object.keys(events).forEach(key => {
                eventString += `${key}="${events[key]}"`
            });
        }
        return eventString;
    }

    buildJSXElementFromJson(data: string | any): any {
        const attributes = this.buildAttributes(data.attributes);
        const eventListeners = this.buildEventListeners(data.events);
        const _buttonString = `<input ${attributes} ${eventListeners} style="${super.buildCSSString(data.style)}" ><br><br>`;
        return _buttonString;
    }
}

export default InputBuilder;
