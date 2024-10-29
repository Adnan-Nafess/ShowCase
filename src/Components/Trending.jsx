import { useNavigate } from "react-router-dom";
import Topnav from "./Templates/Topnav";
import Dropdown from "./Templates/Dropdown";
import { useEffect, useState, useCallback } from "react";
import axios from "../utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = `SCSDB | Trending ${category.toUpperCase()}`;

    const GetTrending = useCallback(async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            if (data.results.length > 0) {
                setTrending((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error", err.response ? err.response.data : err.message);
        }
    }, [category, duration, page]);

    const refreshHandler = () => {
        setPage(1);
        setTrending([]);
        setHasMore(true);
    };

    useEffect(() => {
        refreshHandler();
    }, [category, duration]);

    useEffect(() => {
        if (trending.length === 0) {
            GetTrending();
        }
    }, [GetTrending, trending]);

    return trending.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex flex-col md:flex-row items-start md:items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400 mb-3 md:mb-0 mt-3">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Trending
                    <small className="ml-2 text-sm text-zinc-600">({category})</small>
                </h1>

                {/* Responsive Category and Topnav */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center w-full md:w-[80%] gap-3">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["movie", "tv", "all"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                    <Dropdown
                        title="Duration"
                        options={["week", "day"]}
                        func={(e) => setDuration(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={trending.length}
                next={GetTrending}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={trending} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Trending;
