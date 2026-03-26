import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
export default function ClothesSection({ clothingItems }) {
  return (
    <section className="clothes">
      <div className="clothes__heading">
        <p className="clothes-heading__title">Your Items</p>
        <button className="clothes-heading__btn">+ Add new</button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => {
          return <ItemCard key={item._id} item={item} />;
        })}
      </ul>
    </section>
  );
}
