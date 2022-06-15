import { Navigate } from "react-router-dom";
export default function RequireAuth(props) {
  const childeren = props.children;
  const token = localStorage.getItem("token");
  return token ? childeren : <Navigate to="/" />;
}
