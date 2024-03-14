import useApiRequest from "@src/hooks/useApiRequest";
import AuthOnly from "@src/components/AuthOnly";
import useUserOutletContext from "@src/pages/users/outlet/useUserOutlet";

function UserTodosPage() {
  const user = useUserOutletContext();
  const {
    success,
    data: todos,
    error,
  } = useApiRequest("users.todos.all", user.id);

  return (
    <div>
      <h2>User todos</h2>
      <AuthOnly>
        <button className="btn btn-success">Add todo</button>
      </AuthOnly>
      <hr />
      {success && (
        <ul className="list-group">
          {todos.map((todo) => (
            <li className="list-group-item" key={todo.id}>
              {todo.todo}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-danger">Some error, not loaded</div>}
    </div>
  );
}

export default UserTodosPage;
