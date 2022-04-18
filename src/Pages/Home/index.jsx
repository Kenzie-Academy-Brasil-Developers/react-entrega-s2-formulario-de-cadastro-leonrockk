import { useNavigate, Navigate } from "react-router-dom";
import "./styles.css";

export default function Home({ username }) {
  const navigate = useNavigate();
  function handleReturn() {
    navigate("/");
  }

  if (username) {
    return (
      <div className="homePage">
        <h2>Welcome {username}</h2>
        <button onClick={handleReturn}>Return</button>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}
