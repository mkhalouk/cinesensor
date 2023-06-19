import { Component } from 'react'
import Header from '../../shared/components/header/Header'
import { readFormElements } from '../../shared/utils/JsonReader';
import data from '../../assets/json/data-editor-button-v1.json';
import { createElement } from '../../shared/utils/ElementCreator';
import TempChartCard from '../../shared/components/chart-holder/temperature/TempChartCard'
import HumidityChartCard from '../../shared/components/chart-holder/humidity/HumidityChartCard'
import PressureChartCard from '../../shared/components/chart-holder/pressure/PressureChartCard'
import NoiseChartCard from '../../shared/components/chart-holder/noise/NoiseChartCard'
import './DashBoard.css'


class DashBoard extends Component {

    constructor(props: any) {
        super(props);
        this.state = { elements: [] };
    }

    componentDidMount() {
        const _elements = readFormElements(data, (data: any) => {
            const element = createElement(data, {});
            return element;
        });
        this.setState({ elements: _elements });
    }

    render() {
        return (
            <>
                <nav>
                    <Header />
                </nav>
                <main>
                    <div className="dataEditor">
                        {this.state.elements}

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
