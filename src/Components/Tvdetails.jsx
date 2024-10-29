import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asynccloadtv } from "../store/actions/tvAction";
import { removetv } from "../store/reducers/tvSlice";
import Loading from "./Loading";
import HorizontalCards from "./Templates/HorizontalCards";

const Tvdetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id, dispatch]);

  const renderWatchProviders = (providers, label) => (
    providers && providers.length > 0 && (
      <div className="flex gap-x-5 items-center text-white">
        <h1>{label}</h1>
        {providers.map((provider, i) => (
          <img
            key={i}
            className="w-[7vh] h-[7vh] object-cover rounded-md"
            title={provider.provider_name}
            src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
            alt={provider.provider_name}
          />
        ))}
      </div>
    )
  );

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.6)),
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-screen px-[8%] overflow-y-auto"
    >
      {/* Part 1 Nav */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center text-xl gap-10">
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></Link>
        <a target="_blank" rel="noopener noreferrer" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 Poster and details */}
      <div className="w-full flex flex-col md:flex-row">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-full md:w-[55vh] h-[40vh] md:h-[55vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt={info.detail.name || info.detail.title}
        />
        <div className="content ml-0 md:ml-[5%] text-white mt-4 md:mt-0">
          <h1 className="text-3xl md:text-5xl font-black text-white">
            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            <small className="text-xl md:text-2xl font-bold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>
          <div className="mt-3 mb-5 flex flex-col md:flex-row items-center gap-x-3">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl leading-6">User Score</h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>
          <h1 className="text-xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>
          <h1 className="text-2xl mt-5">Overview</h1>
          <p className="mb-10">{info.detail.overview}</p>
          <Link className="mt-5 p-5 bg-[#6556CD] rounded-lg" to={`${pathname}/trailer`}>
            <i className="text-xl mr-3 ri-play-fill"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Available on platform */}
      <div className="w-full md:w-[50%] h-auto flex flex-col mt-6 gap-5">
        {renderWatchProviders(info.watchproviders?.flatrate, "Available on Platform")}
        {renderWatchProviders(info.watchproviders?.rent, "Available on Rent")}
        {renderWatchProviders(info.watchproviders?.buy, "Available to Buy")}
      </div>

      {/* Part 4 Seasons */}
      <hr className="border-none h-[2px] bg-zinc-500 mt-3" />
      <h1 className="text-3xl mt-5 font-bold text-white">Seasons</h1>
      <div className="w-full flex overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((season, i) => (
            <div className="w-[15vh] mr-[5%]" key={i}>
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[20vh] h-[30vh] object-cover"
                src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                alt={season.name}
              />
              <h1 className="text-2xl text-zinc-400 mt-3 font-semibold">{season.name}</h1>
            </div>
          ))
        ) : (
          <h1 className="text-3xl mt-5 text-white font-black text-center">Nothing to show</h1>
        )}
      </div>

      {/* Part 5 Recommendation and similar stuff */}
      <hr className="border-none h-[2px] bg-zinc-500 mt-3" />
      <h1 className="text-3xl mt-5 font-bold text-white">Recommendation & Similar Stuff</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetails;
