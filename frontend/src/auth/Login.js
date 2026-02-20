import logo from "../pictures/logo.png";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="BuildSafe logo" className="login-logo" />

        <input
          type="text"
          placeholder="Username"
          className="login-input"
        />

        <div className="password-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <span className="eye">👁</span>
        </div>

        <button className="login-btn">Login</button>
      </div>
    </div>
  );
};

export default Login;
