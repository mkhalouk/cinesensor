//@ts-nocheck
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
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ChartCard from '../../shared/components/chart-holder/ChartCard';
import temperatureOptions from '../../assets/json/temperature-chart-options.json';
import humidityOptions from '../../assets/json/humidity-chart-options.json';
import pressureOptions from '../../assets/json/pressure-chart-options.json';
import noiseOptions from '../../assets/json/noise-chart-options.json';





class DashBoard extends Component {

    constructor(props: any) {
        super(props);
        this.state = { elements: [], username:'', redirect: false  };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const _elements = readFormElements(data, (data: any) => {
            const element = createElement(data, {});
            return element;
        });
        this.setState({ elements: _elements, username :  Cookies.get('username')});
    }

    logout() : void {
        Cookies.remove('username', {path : '/', sameSite : 'Strict'});
        this.setState({ redirect: true, username: Cookies.get('username')});
    }

    render() {
        
        if (!this.state.username && this.state.redirect) {
            return <Navigate to="/login" replace={true} />;
        } else {
            return (
                <>
                    <nav>
                        <Header logoutFn={this.logout} />
                    </nav>
                    <main>
                        <div className="dataEditor">
                            {this.state.elements}

                        </div>

                        <div className="chart-ctn">
                            <div><ChartCard label={'temperature'} options={temperatureOptions} /></div>
                            <div><ChartCard label={'humidity'} options={humidityOptions} /></div>
                            <div><ChartCard label={'noise'} options={noiseOptions} /></div>
                            <div><ChartCard label={'pressure'} options={pressureOptions} /></div>
                        </div>
                    </main>
                    <footer>
                        <p>©Copyright 2050 by nobody. All rights reversed.</p>
                    </footer>
                </>
            )
        }

    }
}


export default DashBoard
