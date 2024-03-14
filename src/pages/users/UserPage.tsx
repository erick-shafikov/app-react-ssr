import { observer } from "mobx-react";
import useRouteInt from "@src/hooks/useRouteInt";
import Error404 from "@src/components/errors/errors";
import UserDetailed from "@src/components/users/UserDetailed";
import useStore from "@src/contexts/useStore";

const UserPage = observer(() => {
  const routeId = useRouteInt("id");
  const { users } = useStore();
  const user = routeId.isValid ? users.one(routeId.value) : undefined;

  if (!user) {
    return <Error404 title="User not found" />;
  }

  const neighbors = users.neighbors(user.id);

  return <UserDetailed user={user} neighbors={neighbors} key={user.id} />;
});

export default UserPage;
