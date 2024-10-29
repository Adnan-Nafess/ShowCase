import axios from "../../utils/Axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Topnav = () => {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const GetSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results);
        } catch (err) {
            console.log("Error", err);
        }
    };

    useEffect(() => {
        if (query.length > 0) {
            GetSearches();
        } else {
            setSearches([]);
        }
    }, [query]);

    return (
        <div className="w-full h-[10vh] relative flex justify-center items-center mx-auto px-5 md:px-0">
            <i className="text-zinc-400 text-3xl ri-search-line"></i>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}  
                className="w-full md:w-[50%] text-zinc-200 mx-2 p-2 text-xl outline-none border-none bg-transparent"
                type="text"
                placeholder="Search anything"
            />
            {query.length > 0 && (
                <i
                    onClick={() => {
                        setQuery("");
                        setSearches([]);
                    }}
                    className="text-zinc-400 text-3xl ri-close-fill cursor-pointer"
                ></i>
            )}
            <div className="z-[100] w-full md:w-[50%] max-h-[50vh] absolute top-[100%] left-[50%] transform -translate-x-1/2 bg-zinc-200 overflow-auto rounded-md shadow-lg">
                {searches && searches.length > 0 && (
                    searches.map((s, i) => (
                        <Link
                            to={`/${s.media_type}/details/${s.id}`}
                            key={i}
                            className="hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600 font-semibold flex justify-start items-center border-b-2 border-zinc-100 p-3 md:p-5"
                        >
                            <img
                                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                                src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : noimage}
                                alt=""
                            />
                            <span className="text-sm md:text-base">
                                {s.name || s.title || s.original_name || s.original_title}
                            </span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Topnav;
