export function MoodBoardItem({color,image,description}) {
  return (
    <div className="mood-board-item" style={{backgroundColor: color}}>
    <img className="mood-board-image" src={image}/>
    <h3 className="mood-board-text">{description}</h3>
    </div>
  );
}

export function MoodBoard() {
  const boards=[
    {
      id: 1,
      color: "blue",
      image: "https://cdn.freecodecamp.org/curriculum/labs/shore.jpg",
      description: "Pathway"
    },
    {
      id: 2,
      color: "red",
      image: "https://cdn.freecodecamp.org/curriculum/labs/shore.jpg",
      description: "shore"
    },
    {
      id: 3,
      color: "pink",
      image: "https://cdn.freecodecamp.org/curriculum/labs/pigeon.jpg",
      description: "pigeon"
    },
  ];
  return (
<div>
<h1 className="mood-board-heading">Destination Mood Board</h1>
<div className="mood-board">

{boards.map(
  (board) => (
    <MoodBoardItem
    key={board.id}
    color={board.color}
    image={board.image}
    description={board.description}
    />
  ))}
</div>
</div>
  );
}
