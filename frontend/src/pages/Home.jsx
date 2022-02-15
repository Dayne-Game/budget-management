import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>This is the Homepage</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/login" className="btn btn-reverse btn-block">
        Login
      </Link>

      <Link to="/register" className="btn btn-block">
        Register
      </Link>
    </>
  );
}

export default Home;
