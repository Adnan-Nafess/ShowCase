import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./Templates/Topnav";
import Dropdown from "./Templates/Dropdown";
import Cards from "./Templates/Cards";

const Movie = () => {
    document.title = "SCSDB | Movies";

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data.results.length > 0) {
                setMovies((prevMovies) => [...prevMovies, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const refreshHandler = () => {
        setPage(1);
        setMovies([]);
        fetchMovies();
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return movies.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex flex-col md:flex-row items-start md:items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400 mb-3 md:mb-0 mt-3">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Movie
                    <small className="ml-2 text-sm text-zinc-600">
                        ({category})
                    </small>
                </h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center w-full md:w-[80%] gap-3">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["popular", "top_rated", "upcoming", "now_playing"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={movies.length}
                next={fetchMovies}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={movies} title="movie" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Movie;
