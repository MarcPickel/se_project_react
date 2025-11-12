import "./SideBar.css";

function SideBar({ userData }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        {userData.avatar ? (
          <img
            src={userData.avatar}
            alt={userData.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-circle">
            <p className="sidebar__avatar-letter">{userData.name[0]}</p>
          </div>
        )}
        <p className="sidebar__username">{userData.name}</p>
      </div>
      <button className="sidebar__text" type="button">
        Change profile data
      </button>
      <button className="sidebar__text" type="button">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
