const { useState, useEffect } = React;

export const PetGame = () => {

  const [petName, setPetName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const [hunger, setHunger] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [happiness, setHappiness] = useState(100);


function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
  e.preventDefault();

  const form = e.currentTarget;

  const input = form.elements.namedItem("pet-name") as HTMLInputElement;

  setPetName(input.value);
  setGameStarted(true);
 
}

function handleEat(): void {
  setHunger((current) => Math.max(0, current - 10));
  setEnergy((current) => Math.min(100, current + 10));
}

function handlePlay(): void{
  setEnergy((current) => Math.max(0, current - 10));
  setHappiness((current) => Math.min(100, current + 10));
}

function handleSleep(): void {
  setHunger((current) => Math.min(100, current + 10));
  setEnergy((current) => Math.min(100, current + 10));
}

  enum PetMood {
    HAPPY,
    EXCITED,
    CONTENT,
    SAD,
    TIRED,
    SICK,
    HUNGRY,
  };

  enum Action {
    EAT,
    PLAY,
    SLEEP
  }

const petMoodEmoji: Record<PetMood, string> = {
  [PetMood.HAPPY]: "😊",
  [PetMood.EXCITED]: "🤩",
  [PetMood.CONTENT]: "🙂",
  [PetMood.SAD]: "😢",
  [PetMood.TIRED]: "😴",
  [PetMood.SICK]: "🤒",
  [PetMood.HUNGRY]: "😋",
};

function getPetMood(): PetMood {
  if (hunger > 70) {
    return PetMood.HUNGRY; 
  }

  if (energy < 30) {
    return PetMood.TIRED;
  }

  if (happiness < 30){
    return PetMood.SAD;
  }

  if (happiness > 80 && energy > 70) {
    return PetMood.EXCITED;
  }

  if (happiness > 60) {
    return PetMood.HAPPY;
  }

  return PetMood.CONTENT;

}

const currentMood = getPetMood();

function handleAction(action: Action):void {
  if (action === Action.EAT) {
    handleEat();
  }

  if (action === Action.PLAY) {
    handlePlay();
  }

  if (action === Action.SLEEP) {
    handleSleep()
  }
}

  useEffect( () => {
    if (!gameStarted) {
      return;
    }

   const interval = setInterval(
      () => {
        setHunger((current) => Math.min(100, current + 5));
        setEnergy((current) => Math.min(100, current));
        setHappiness((current) => Math.max(0, current - 5));
      }, 60000
    );

    return () => clearInterval(interval);

  }, [gameStarted]    
    
  );
  

  return (
  <>
    <h1>Digital Pet Game</h1>
    <p>Take care of your virtual companion!</p>

    {gameStarted === false ? (
      <div id="first-view">
        <p>What is your pet name?</p>

        <form onSubmit={handleSubmit}>
          <input
            id="pet-name"
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <br />

          <button
            id="submit-button"
            type="submit"
          >
            Start Game
          </button>
        </form>
      </div>
    ) : (
      <div id="second-view">
        <p className="pet-name">{petName}</p>

        <p className="pet-mood">{petMoodEmoji[currentMood]}</p>

        <button id="eat-action" onClick={() => handleAction(Action.EAT)}>EAT</button>
        <button id="play-action" onClick={() => handleAction(Action.PLAY)}>PLAY</button>
        <button id="sleep-action" onClick={() => handleAction(Action.SLEEP)}>SLEEP</button>

        <div className="stat">
          <p>
            Hunger <span className="stat-value">{hunger}</span>
          </p>
        </div>

        <div className="stat">
          <p>
            Energy <span className="stat-value">{energy}</span>
          </p>
        </div>

        <div className="stat">
          <p>
            Happiness <span className="stat-value">{happiness}</span>
          </p>
        </div>
      </div>
    )}
  </>
);

};
