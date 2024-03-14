import { observer } from "mobx-react";
import { useOutletContext } from "react-router-dom";
import { TPost } from "@src/types/data";
import useStore from "@src/contexts/useStore";
import AppLink from "@src/router/AppLink";

const PostViewPage = observer(() => {
  const post = useOutletContext<TPost>();
  const {
    auth: { user },
  } = useStore();

  return (
    <>
      <h1>{post.title}</h1>
      <pre>{post.body}</pre>
      {user?.id === post.userId && (
        <AppLink to="post.edit" params={[post.id]}>
          Edit post
        </AppLink>
      )}
    </>
  );
});

export default PostViewPage;
