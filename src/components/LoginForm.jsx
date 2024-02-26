import propTypes from "prop-types"

const LoginForm = ({
  onSubmit,
  username,
  password,
  onUsernameChange,
  onPasswordChange
}) => {
  return(
    <form onSubmit={ onSubmit }>
      <div>
        username
        <input
          value={username}
          onChange={onUsernameChange}
          type="text"
          id="login-input-username"
        />
      </div>
      <div>
        password
        <input
          value={password}
          onChange={onPasswordChange}
          type="password"
          id="login-input-password"
        />
      </div>
      <button type="submit" id="login-button">
          login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  onUsernameChange: propTypes.func.isRequired,
  onPasswordChange: propTypes.func.isRequired
}

export default LoginForm