const Login = ({ onSubmit, username, password, onUsernameChange, onPasswordChange }) => {
    return(
        <form onSubmit={ onSubmit }>
            <div>
                username 
                <input 
                    value={username} 
                    onChange={onUsernameChange}
                    type="text" 
                />
            </div>
            <div>
                password 
                <input 
                    value={password} 
                    onChange={onPasswordChange}
                    type="password"
                />
            </div>
            <button type="submit">
                login
            </button>
        </form>
    )
}

export default Login