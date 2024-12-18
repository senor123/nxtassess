import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

function Header(props) {
  const handleLogin = () => {
    props.history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <header>
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dee8unwh3/image/upload/v1733878189/image_28_Traced_1_aopqm8.png"
          alt="website logo"
        />
        <p>NXT Assess</p>
      </Link>
      <button onClick={handleLogin}>Logout</button>
    </header>
  )
}

export default withRouter(Header)
