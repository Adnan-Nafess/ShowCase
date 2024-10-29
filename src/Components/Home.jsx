import { useEffect, useState } from "react";
import Sidenav from "./Templates/Sidenav";
import Topnav from "./Templates/Topnav";
import axios from "../utils/Axios";
import Header from "./Templates/Header";
import HorizontalCards from "./Templates/HorizontalCards";
import Dropdown from "./Templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "SCSDB | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const fetchHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setWallpaper(data.results[randomIndex]);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchTrending();
    if (!wallpaper) fetchHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-full lg:w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
