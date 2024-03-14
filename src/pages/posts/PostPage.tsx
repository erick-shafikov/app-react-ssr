import useRouteInt from "@src/hooks/useRouteInt";
import Error404 from "@src/components/errors/errors";
import useApiRequest from "@src/hooks/useApiRequest";
import { Outlet } from "react-router-dom";

function PostPage() {
  const routeId = useRouteInt("id");
  const {
    done,
    success,
    data: post,
  } = useApiRequest("users.posts.one", routeId.value ?? 0);

  if (!done) {
    return <div>Loading...</div>;
  }

  if (!success || !routeId.isValid) {
    return <Error404 title="Post not found" />;
  }

  return (
    <>
      <Outlet context={post} />
    </>
  );
}

export default PostPage;
