import { Component } from 'react'
import Header from '../../shared/components/header/Header'
import { FormBuilder } from '../../shared/components/form-builder/FormBuilder'
import { readFormElements } from '../../shared/utils/JsonReader';
import data from '../../assets/json/data-editor-button-v1.json';
import { createElement } from '../../shared/utils/ElementCreator';
import TempChartCard from '../../shared/components/chart-holder/temperature/TempChartCard'
import HumidityChartCard from '../../shared/components/chart-holder/humidity/HumidityChartCard'
import PressureChartCard from '../../shared/components/chart-holder/pressure/PressureChartCard'
import NoiseChartCard from '../../shared/components/chart-holder/noise/NoiseChartCard'
import './DashBoard.css'


class DashBoard extends Component<{}, IDashBoardState> {
    constructor(props: any) {
        super(props);
        this.state = { content: "<div>content</div>" };
    }

    componentDidMount() {
        const _JsxString = readFormElements(data, (data: any) => createElement(data, {}));
        this.setState({ content: _JsxString });
    }

    render() {
        return (
            <>
                <nav>
                    <Header />
                </nav>
                <main>
                    <div className="dataEditor">
                        <FormBuilder html={this.state.content} />
                    </div>

                    <div className="chart-ctn">
                        <div><TempChartCard /></div>
                        <div><HumidityChartCard /></div>
                        <div><PressureChartCard /></div>
                        <div><NoiseChartCard /></div>
                    </div>
                </main>
                <footer>
                    <p>©Copyright 2050 by nobody. All rights reversed.</p>
                </footer>
            </>
        )
    }
}


export default DashBoard
