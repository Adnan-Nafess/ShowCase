import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import TvShoes from "./Components/TvShoes";
import People from "./Components/People";
import Moviedetails from "./Components/Moviedetails";
import Tvdetails from "./Components/Tvdetails";
import Persondetails from "./Components/Persondetails";
import Trailer from "./Components/Templates/Trailer";
import Notfound from "./Components/Notfound";

const App = () => (
  <div className="bg-[#1F1E24] w-screen h-screen flex">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movie" element={<Movie />} />
      <Route path="/movie/details/:id" element={<Moviedetails />}>
        <Route path="trailer" element={<Trailer />} />
      </Route>
      <Route path="/tv" element={<TvShoes />} />
      <Route path="/tv/details/:id" element={<Tvdetails />}>
        <Route path="trailer" element={<Trailer />} />
      </Route>
      <Route path="/person" element={<People />} />
      <Route path="/person/details/:id" element={<Persondetails />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  </div>
);

export default App;
