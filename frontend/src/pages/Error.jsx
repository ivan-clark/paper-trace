import { Link } from "react-router-dom";

const Error = (props) => {
  return (
    <div id="errorpage">
      <h1>Oops! </h1>
      <span>Looks like this page does not exist :(</span>
      <Link className="go-back" to="/inbox">Go back</Link>
    </div>
  );
};

export default Error;
