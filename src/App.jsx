import { Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import TvShows from "./pages/TvShows"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import MyList from "./pages/MyList"
function App(){
  return(<Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-list" element={<MyList />} />
      </Route>
    </Routes>)
}

export default App;
