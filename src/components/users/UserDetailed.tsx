import { Link } from "react-router-dom";
import { TUserNeighbors, TUserPrimary } from "@src/types/data";
import useApiRequest from "@src/hooks/useApiRequest";
import AppLink from "@src/router/AppLink";
import UserOutlet from "@src/pages/users/outlet/UserOutlet";

interface UserDetailedProps {
  user: TUserPrimary;
  neighbors: TUserNeighbors;
}

function UserDetailed({ user, neighbors: neighbors }: UserDetailedProps) {
  const { success, data } = useApiRequest("users.one", user.id);

  return (
    <div>
      <AppLink to="home">Home</AppLink> /<span>{user.username}</span>
      <hr />
      {success && (
        <>
          <div>
            {data.phone}
            {data.company.name}
            {data.website}
          </div>
          <hr />
          <AppLink to="user.todos" params={[user.id]}>
            Todos
          </AppLink>
          <AppLink to="user.posts" params={[user.id]} className="ms-2">
            Posts
          </AppLink>
          <hr />
          <UserOutlet context={data} />
        </>
      )}
      <hr />
      {neighbors.prev && (
        <Link to={`/user/${neighbors.prev.id}`}>Prev user</Link>
      )}
      {neighbors.next && (
        <Link to={`/user/${neighbors.next.id}`}>Next user</Link>
      )}
    </div>
  );
}

export default UserDetailed;
