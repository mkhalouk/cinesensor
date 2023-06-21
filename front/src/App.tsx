import { Component } from 'react'
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import DashBoard from './pages/dashboard/DashBoard';
import MqttService from './services/MqttService';


class App extends Component {
  private username: string | undefined;
  constructor(props: any) {
    super(props);
    this.username = Cookies.get('username')
  }

  componentDidMount(): void {
    const mqttService = new MqttService();
    mqttService.initMqttClient();
  }

  render() {
    if (this.username) {
      return <DashBoard/>;
    } else {
      return <Navigate to="/login" replace={true} />;
    }
  }
}


export default App
