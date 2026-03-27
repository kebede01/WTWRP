import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
export default function Profile({clothingItems, handlePreviewModal}) {
  return (
    <section className="profile">
      
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
      handlePreviewModal={handlePreviewModal}
      />
    </section>
        
  )
}