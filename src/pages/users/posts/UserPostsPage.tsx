import useApiRequest from "@src/hooks/useApiRequest";
import AppLink from "@src/router/AppLink";
import useUserOutletContext from "@src/pages/users/outlet/useUserOutlet";

function UserPostsPage() {
  const user = useUserOutletContext();
  const { success, data: posts } = useApiRequest("users.posts.all", user.id);

  // console.log(posts);

  return (
    <div>
      <h2>User posts</h2>
      {success && (
        <ul className="list-group">
          {posts.map((post) => (
            <li className="list-group-item" key={post.id}>
              <span className="d-flex justify-content-between">
                <span>{post.title}</span>
                <AppLink to="post" params={[post.id]}>
                  Read more
                </AppLink>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserPostsPage;
