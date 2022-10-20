import { Suspense } from "react";
import Box from "./components/Box";
import Carshow from "./components/carshow/Carshow";
import Circle from "./components/Circle";
import './components/style.css'

function App() {
  return (
    <div className="App">
      {/* <Suspense fallback={null}> */}
        {/* <Box></Box> */}
        {/* <Circle></Circle> */}
        <Carshow></Carshow>
      {/* </Suspense> */}
    </div>
  );
}

export default App;
