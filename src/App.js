
import { useState } from "react";
import ClippedDrawer from "./components/ClippedDrawer";
import PokemonsList from "./components/PokemonsList";
import TrainersList from "./components/TrainersList";

const drawerOptions = [
  {
    name: "Pokemons",
    dir: "pokemons"
  },
  {
    name: "Trainers",
    dir: "trainers"
  },
  {
    name: "API Documentation",
    dir: "docs"
  }
]

function App() {
  const [chosenTab, setChosenTab] = useState("pokemons")

  const handleTabChange = (tabChoice) => {
    console.log(`Tab: ${tabChoice["name"]}`);
    setChosenTab(tabChoice["dir"])

  }
  console.log(chosenTab)

  return (
    <div>
      <ClippedDrawer drawerOptions={drawerOptions} handleTabChoice={handleTabChange}>
        {chosenTab === "pokemons" && <PokemonsList />}
        {chosenTab === "trainers" && <TrainersList />}
      </ClippedDrawer>
    </div>
  );
}

export default App;
