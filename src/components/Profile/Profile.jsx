import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleOpenProfileUpdate,
  handlePreviewModal,
  logOut,
}) {
  return (
    <section className="profile">
      <SideBar handleProfileOpen={handleOpenProfileUpdate} logOut={logOut} />
      <ClothesSection
        clothingItems={clothingItems}
        handlePreviewModal={handlePreviewModal}
      />
    </section>
  );
}
export default React.memo(Profile);
