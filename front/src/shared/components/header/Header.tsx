import { Component } from 'react'
import './Header.css'
import DropDownAvatar from '../dropdown-avatar/DropDownAvatar'

interface HeaderProps {
  logoutFn: () => void;
}


class Header extends Component<HeaderProps>  {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <>
        <div className="header-ctn">
          <a className="logo-ctn" href="/">
            <div>
              <img width="60" height="60" src="https://img.icons8.com/ios-glyphs/60/electrical-sensor.png" alt="electrical-sensor" />
              <span></span>
              <div className="logo-title">CINESENSOR</div>
            </div>
          </a>
          <DropDownAvatar logoutFn={this.props.logoutFn} />
        </div>
      </>
    )
  }
}


export default Header