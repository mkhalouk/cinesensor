import { Component } from 'react';
import Header from '../../shared/components/header/Header';
import { readFormElements } from '../../shared/utils/JsonReader';
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

interface DashboardState {
  elements: any[];
  username?: string;
  redirect: boolean;
}

class DashBoard extends Component<{}, DashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = { elements: [], username: '', redirect: false };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const _elements = readFormElements(data, (data: any) => {
      const element = createElement(data, {});
      return element;
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
            <div className="dataEditor">{this.state.elements}</div>

            <div className="chart-ctn">
              <div>
                <ChartCard identifier={'temperature'} options={temperatureOptions} />
              </div>
              <div>
                <ChartCard identifier={'humidity'} options={humidityOptions} />
              </div>
              <div>
                <ChartCard identifier={'noise'} options={noiseOptions} />
              </div>
              <div>
                <ChartCard identifier={'pressure'} options={pressureOptions} />
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
