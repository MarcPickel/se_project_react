import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({
  onCardClick,
  clothingItems,
  onAddClick,
  userData,
  isLoggedIn,
  handleEditProfileClick,
  onChangeLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          userData={userData}
          isLoggedIn={isLoggedIn}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
          onChangeLike={onChangeLike}
        />
      </section>
    </div>
  );
}

export default Profile;
