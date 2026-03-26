import "./ItemCard.css";
export default function ItemCard({ item, handlePreviewModal }) {
  const handleCardClick = () => {
    handlePreviewModal(item);
  };
  return (
    <li className="cards__list-item">
      <div onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <p className="cards__img-name">{item.name}</p>
        <img
          src={item.link}
          alt={`A photo of ${item.name}`}
          className="cards__img"
        />
      </div>
    </li>
  );
}
