import "./styles.css";
import DragNDrop from "./components/DragNDrop";

const modules = [
  {
    id: "1",
    name: "moduł 1",
  },
  {
    id: "2",
    name: "moduł drugi",
  },
  {
    id: "3",
    name: "Bug coś tam",
  },
  {
    id: "4",
    name: "Dopytanie o zamówienie",
  },
  {
    id: "5",
    name: "Ustawienia środowiska",
  },
];
const groups = [
  {
    title: "Ustawienia środowiska",
    items: ["1", "2", "3"],
  },
  {
    title: "jakas tam druga grupa",
    items: ["4", "5"],
  },
];

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={groups} modules={modules} />
      </header>
    </div>
  );
}
