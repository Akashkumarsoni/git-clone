import Compo1 from "./SearchPage";
import "@shopify/polaris/build/esm/styles.css";
import { Route, Routes } from "react-router-dom";
import Profilepage from "./ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Compo1 />} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>
    </div>
  );
}

export default App;
