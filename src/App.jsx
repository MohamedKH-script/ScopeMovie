import { Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./pages/Home"
import Movies from "./pages/Movies"

function App(){
  return(<Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Route>
    </Routes>)
}

export default App;
