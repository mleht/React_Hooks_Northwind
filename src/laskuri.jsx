import "./App.css";

const Laskuri = ({ luku, setLuku }) => {
  return (
    <div>
      <h2>{luku}</h2>
      <button onClick={() => setLuku(luku + 1)}>+1</button>
      <br />
      <button onClick={() => setLuku(luku - 1)}>-1</button>
      <br />
      <button onClick={() => setLuku(0)}>nollaa</button>
    </div>
  );
};

export default Laskuri;
