import { observer } from "mobx-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { TPost } from "@src/types/data";
import useStore from "@src/contexts/useStore";
import { useState } from "react";
import useApi from "@src/contexts/useApi";
import { AxiosError } from "axios";
import AppLink from "@src/router/AppLink";

const PostEditPage = observer(() => {
  const post = useOutletContext<TPost>();
  const {
    auth: { user },
  } = useStore();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const {
    users: {
      posts: { update },
    },
  } = useApi();
  const navigate = useNavigate();

  if (user?.id !== post.userId) {
    return <h1>Forbidden 403</h1>;
  }

  async function tryUpdate() {
    setErrors([]);
    setMessage("");

    try {
      const updPost = await update(post.id, title, body);
      setTitle(updPost.title);
      setBody(updPost.body);
      setMessage("updated");
      navigate(0);
    } catch (_) {
      const e = _ as AxiosError;

      if (e.response?.status === 422) {
        setErrors(e.response.data as string[]);
      }
    }
  }

  return (
    <div>
      <AppLink to="post.view" params={[post.id]}>
        Back to post
      </AppLink>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={tryUpdate}
        >
          Try auth
        </button>
        <div className="text-danger mt-3">
          {errors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
        {message}
      </form>
    </div>
  );
});

export default PostEditPage;
