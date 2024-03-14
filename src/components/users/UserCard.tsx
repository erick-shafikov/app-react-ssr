import { Link } from "react-router-dom";
import { TUserPrimary } from "@src/types/data";

interface UserCardProps {
  user: TUserPrimary;
  classNames?: string;
}

function UserCard({ user, classNames = "" }: UserCardProps) {
  return (
    <div className={classNames}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">{user.email}</p>
          <Link to={`/user/${user.id}`} className="btn btn-primary">
            Go to profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
