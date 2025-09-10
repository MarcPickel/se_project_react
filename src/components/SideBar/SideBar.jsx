import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <section className="sidebar">
      <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </section>
  );
}

export default SideBar;
