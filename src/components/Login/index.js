import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', passwordChecked: false, errorMsg: ''}

  setUserName = e => {
    this.setState({username: e.target.value})
  }

  setPassword = e => {
    this.setState({password: e.target.value})
  }

  changePasswordType = () => {
    this.setState(prevState => ({passwordChecked: !prevState.passwordChecked}))
  }

  handleLogin = async e => {
    e.preventDefault()
    const body = {
      username: this.state.username,
      password: this.state.password,
    }
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const resData = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', resData.jwt_token, {expires: 30})
      this.props.history.replace('/')
    } else {
      this.setState({errorMsg: resData.error_msg})
    }
  }

  getPasswordVisible = () => {
    if (this.state.passwordChecked) {
      return 'text'
    }
    return 'password'
  }

  render() {
    const {username, password, errorMsg} = this.state
    const passwordType = this.getPasswordVisible()
    return (
      <div className="loginsection">
        <div className="loginlogo">
          <img
            src="https://res.cloudinary.com/dee8unwh3/image/upload/v1732772847/image_28_Traced_hcznvf.png"
            alt="login"
            className="login website logo"
          />
          <p className="nxtlogin">
            NXT <span className="nxtaccess">Assess</span>
          </p>
        </div>

        <form className="loginform" onSubmit={this.handleLogin}>
          <div className="loginfield">
            <label className="loginlabel" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              className="logininput"
              value={username}
              onChange={this.setUserName}
              id="username"
            />
          </div>

          <div className="loginfield">
            <label className="loginlabel" htmlFor="password">
              PASSWORD
            </label>
            <input
              type={passwordType}
              className="logininput"
              value={password}
              onChange={this.setPassword}
              id="password"
            />
          </div>

          <div className="displaypassword">
            <input
              type="checkbox"
              id="showpassword"
              onChange={this.changePasswordType}
            />
            <label htmlFor="showpassword">Show Password</label>
          </div>
          <p>{errorMsg}</p>
          <button className="submitbtn">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
