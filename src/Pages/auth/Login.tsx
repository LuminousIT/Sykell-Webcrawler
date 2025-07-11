import { NavLink } from "react-router";

const Login = () => {
  return (
    <div>
      <section>Login</section>
      <NavLink to={"register"}> Go to Register</NavLink>
    </div>
  );
};

export default Login;
