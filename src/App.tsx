import "./App.css";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import InputComponent from "./components/InputComponent/InputComponent";
// import ListComponent from "./components/ListComponent/ListComponent";

function App() {
  return (
    <div className="App">
      <div className="Header">
        <HeaderComponent />
        {/* <img
          // style={{ marginTop: "20px" }}
          width={"90px"}
          height={"90px"}
          src="https://freesvg.org/img/accessories-text-editor.png"
          alt=""
        /> */}
      </div>
      <InputComponent />
    </div>
  );
}

export default App;
