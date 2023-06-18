import { Component } from 'react'
import './Header.css'

class Header extends Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <>
        <div className="header-ctn">
          <a className="logo-ctn" href="https://www.google.com">
            <div>
              <img width="96" height="96" src="https://img.icons8.com/fluency/96/electrical-sensor.png" alt="electrical-sensor" />
              <span></span>
              <div className="logo-title">CINESENSOR</div>
            </div>
          </a>
          <ul>
            <li><a href="#">Se connecter</a></li>
            <li><a href="#">S'enregistrer</a></li>
          </ul>
        </div>
      </>
    )
  }
}


export default Header