import { Component } from 'react'
import { Navigate } from "react-router-dom";
const loggedIn = true;

class App extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        {loggedIn ? (<Navigate to="/dashboard" replace={true} />) : (<Navigate to="/login" replace={true} />)}
      </>
    )
  }
}


export default App
