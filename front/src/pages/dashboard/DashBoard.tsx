import { Component } from 'react';
import Header from '../../shared/components/header/Header';
import { readWidgetElements } from '../../shared/utils/JsonReader';
import data from '../../assets/json/data-editor-button-v1.json';
import { createElement } from '../../shared/utils/ElementCreator';
import './DashBoard.css';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ChartCard from '../../shared/components/chart-holder/ChartCard';
import temperatureOptions from '../../assets/json/temperature-chart-options.json';
import humidityOptions from '../../assets/json/humidity-chart-options.json';
import pressureOptions from '../../assets/json/pressure-chart-options.json';
import noiseOptions from '../../assets/json/noise-chart-options.json';
import MetricCard from '../../shared/components/metric-card/MetricCard';
import { BehaviorSubject } from 'rxjs';
import MqttService from '../../services/MqttService';
import UserServiceImpl from '../../services/impl/UserServiceImpl';
import serviceData from '../../assets/json/dataservice/metric-service-data.json';


interface DashboardState {
  elements: any[];
  username?: string;
  redirect: boolean;
  subject : BehaviorSubject<string>;
}

class DashBoard extends Component<{}, DashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = { elements: [], username: '', redirect: false, subject : new BehaviorSubject('') };
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    let _elements : any = '';
    _elements = readWidgetElements(data, (data: any) => {
      const element = createElement(data, {});
      return element;
    });
    const userService = new UserServiceImpl();
    const results = await userService.latestReadings(serviceData);
    results.map((result : any) => {
      this.state.subject.next(JSON.stringify(result));
    });
    const mqttService = new MqttService();
    await mqttService.onMessage((__topic, message) => {
      this.state.subject.next(message);
    });
    this.setState({ elements: _elements, username: Cookies.get('username') });
  }

  logout(): void {
    Cookies.remove('username', { path: '/', sameSite: 'Strict' });
    this.setState({ redirect: true, username: Cookies.get('username') });
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
            <div className='metric-card-ctn'>
              <MetricCard icon={"temperature-half"} subject={this.state.subject} identifier={'temperature'} options={temperatureOptions}/>
              <MetricCard icon={"droplet"} subject={this.state.subject} identifier={'humidity'} options={temperatureOptions}/>
              <MetricCard icon={"volume-up"} subject={this.state.subject} identifier={'noise'} options={temperatureOptions}/>
              <MetricCard icon={"wind"} subject={this.state.subject} identifier={'pressure'} options={temperatureOptions}/>
            </div>
            <div className="chart-ctn">
              <div>
                <ChartCard subject={this.state.subject} identifier={'temperature'} options={temperatureOptions} />
              </div>
              <div>
                <ChartCard subject={this.state.subject} identifier={'humidity'} options={humidityOptions} />
              </div>
              <div>
                <ChartCard subject={this.state.subject} identifier={'noise'} options={noiseOptions} />
              </div>
              <div>
                <ChartCard subject={this.state.subject} identifier={'pressure'} options={pressureOptions} />
              </div>
            </div>
          </main>
          <footer>
            <p>© 2050 by nobody. All rights reversed.</p>
          </footer>
        </>
      );
    }
  }
}

export default DashBoard;
