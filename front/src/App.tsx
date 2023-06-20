import { Component } from 'react'
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';


class App extends Component {
  private username: string | undefined;
  constructor(props: any) {
    super(props);
    this.username = Cookies.get('username')
  }

  render() {
    if (this.username) {
      return <Navigate to="/dashboard" replace={true} />;
    } else {
      return <Navigate to="/login" replace={true} />;
    }
  }
}


export default App
