import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Notfound from "../Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="bg-[rgba(0,0,0,.8)] z-[100] fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute text-3xl text-white right-5 top-5 hover:text-[#6556CD] ri-close-fill"
      ></Link>
      {ytvideo ? (
        <div className="w-full max-w-[1200px]">
          <ReactPlayer
            controls
            height="60vh" 
            width="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        </div>
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
