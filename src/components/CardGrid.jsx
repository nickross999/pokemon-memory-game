import "../css/CardGrid.css";
import Card from "./Card.jsx";

function CardGrid({ callback, grid }) {
  let cardElements = grid.map((number, index) => {
    return <Card number={number} key={index} callback={callback} />;
  });

  console.log(cardElements);

  return (
    <>
      {cardElements.length === grid.length ? <div className="card-grid">{cardElements}</div> : <span>Loading...</span>}
    </>
  );
}

export default CardGrid;
