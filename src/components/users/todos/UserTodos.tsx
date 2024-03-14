import { TUserPrimary } from "@src/types/data";
import useApiRequest from "@src/hooks/useApiRequest";

interface UserCardProps {
  user: TUserPrimary;
}

function UserTodos({ user }: UserCardProps) {
  const { success, data: todo } = useApiRequest("users.todos.all", user.id);

  console.log(todo);

  return (
    <div>
      <h2>User todos</h2>
      {success && <ul className="list-group"></ul>}
    </div>
  );
}

export default UserTodos;
