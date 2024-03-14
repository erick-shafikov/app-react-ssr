import { observer } from "mobx-react";
import useStore from "@src/contexts/useStore";
import UserCard from "@src/components/users/UserCard";

const UsersPage = observer(() => {
  const {
    users: { users },
  } = useStore();

  return (
    <div>
      <h1>Home page</h1>
      <div className="row mt-2">
        {users.map((u) => (
          <UserCard user={u} classNames="col col-12 col-md-3 my-3" key={u.id} />
        ))}
      </div>
    </div>
  );
});

export default UsersPage;
