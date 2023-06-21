import { Component } from 'react';
import './DropDownAvatar.css';
import avatar from '../../../assets/images/user_avatar.svg';
interface DropDownAvatarProps {
    logoutFn: () => void;
}

class DropDownAvatar extends Component<DropDownAvatarProps>  {
    constructor(props: DropDownAvatarProps) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutFn();
    }

    render() {

        return (
            <>
                <div className="wrapper">
                    <input id="toggler" type="checkbox" />
                    <label htmlFor="toggler">
                        <img src={avatar} alt="" />
                    </label>
                    <div className="dropdown">
                        <p>Admin</p>
                        <button onClick={this.handleLogout} className='logout'>LOG OUT</button>
                    </div>
                </div>
            </>
        )

    }
}


export default DropDownAvatar