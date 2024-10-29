import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { asynccloadperson } from "../store/actions/personAction";
import { removeperson } from "../store/reducers/personSlice";
import Loading from "./Loading";
import HorizontalCards from "./Templates/HorizontalCards";
import Dropdown from "../Components/Templates/Dropdown";

const Persondetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asynccloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  return info ? (
    <div className="w-screen px-[5%] md:px-[10%] bg-[#1F1E24] h-[160vh] flex flex-col">
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center text-xl gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Section: Poster and Details */}
        <div className="md:w-[20%] w-full">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="border-none h-[2px] bg-zinc-500 mt-3" />

          {/* Social Media Links */}
          <div className="text-2xl flex gap-x-5 text-white">
            {info.externalid.wikidata_id && (
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                rel="noopener noreferrer"
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info.externalid.facebook_id && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                rel="noopener noreferrer"
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info.externalid.instagram_id && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
                rel="noopener noreferrer"
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {info.externalid.twitter_id && (
              <a
                target="_blank"
                href={`https://www.twitter.com/${info.externalid.twitter_id}`}
                rel="noopener noreferrer"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          {/* Personal Information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">Personal Info</h1>
          <h1 className="text-2xl text-zinc-400 font-semibold">Known for</h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400">{info.detail.gender === 2 ? "Male" : "Female"}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Place Of Birth</h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Also Known As</h1>
          <h1 className="text-zinc-400">{info.detail.also_known_as.join(", ")}</h1>
        </div>

        {/* Right Section: Details and Information */}
        <div className="md:w-[80%] w-full overflow-y-auto">
          <h1 className="text-6xl text-zinc-400 font-black my-5">{info.detail.name}</h1>
          <h1 className="text-xl text-zinc-400 font-semibold">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="text-xl text-zinc-400 font-semibold">Summary</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between mt-5">
            <h1 className="text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)} />
          </div>

          <div className="list-disc text-zinc-400 w-full h-auto max-h-[50vh] overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] mt-5 border-zinc-700 p-5">
            {info[`${category}Credits`] && info[`${category}Credits`].cast ? (
              info[`${category}Credits`].cast.map((c, i) => (
                <li key={i} className="hover:text-white p-5 hover:bg-[#19191D] duration-300 cursor-pointer">
                  <Link to={`/${category}/details/${c.id}`}>
                    <span>
                      {c.name || c.title || c.original_name || c.original_title}
                    </span>
                    <span className="block ml-5">
                      {c.character && `Character Name: ${c.character}`}
                    </span>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-zinc-400">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;
