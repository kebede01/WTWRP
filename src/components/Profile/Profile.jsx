import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
export default function Profile({clothingItems, handleProfileOpen, handlePreviewModal}) {
  return (
    <section className="profile">
      
      <SideBar handleProfileOpen={ handleProfileOpen} />
      <ClothesSection
        clothingItems={clothingItems}
      handlePreviewModal={handlePreviewModal}
      />
    </section>
        
  )
}