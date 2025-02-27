import "../css/CardGrid.css";
import Card from "./Card.jsx";

function CardGrid({ callback, grid }) {
  let cardElements = grid.map((number, index) => {
    return <Card number={number} key={index} callback={callback} />;
  });

  return (
    <>
      <div className="card-grid">{cardElements}</div>
    </>
  );
}

export default CardGrid;
