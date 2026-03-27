import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
 
function Profile({ clothingItems, handleOpenProfileUpdate, handlePreviewModal }) {
                

  return (
    <section className="profile">
      
      <SideBar handleProfileOpen={ handleOpenProfileUpdate} />
      <ClothesSection
        clothingItems={clothingItems}
      handlePreviewModal={handlePreviewModal}
      />
    </section>
        
  )
}
export default React.memo(Profile);