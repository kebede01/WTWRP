import "./ItemCard.css";
export default function ItemCard({ item }) {
  return (
    <li key={item._id} className="cards__list-item">
      <p className="cards__img-name">{item.name}</p>
      <img src={item.link} alt={item.name} className="cards__img" />
    </li>
  );
}
