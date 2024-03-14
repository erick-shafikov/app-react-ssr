import { useState } from "react";
import useApi from "@src/contexts/useApi";

function LoginPage() {
  const [username, setUsername] = useState("atuny0");
  const [password, setPassword] = useState("9uQFF1Lh");
  const [errors, setErrors] = useState<string[]>([]);
  const { auth } = useApi();

  async function tryAuth() {
    try {
      setErrors([]);
      const response = await auth.login(username, password);

      if (response.id) {
        localStorage.setItem("AUTH_TOKEN", response.token);
        document.location = "/";
      } else {
        setErrors([...response.message]);
      }
    } catch (e) {
      setErrors(["some server error"]);
    }
  }

  return (
    <form>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="password"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-primary mt-3" onClick={tryAuth}>
        Try auth
      </button>
      <div className="text-danger mt-3">
        {errors.map((err, i) => (
          <p key={i}>{err}</p>
        ))}
      </div>
    </form>
  );
}

export default LoginPage;
