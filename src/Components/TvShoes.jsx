import { useNavigate } from "react-router-dom";
import Topnav from "./Templates/Topnav";
import Dropdown from "./Templates/Dropdown";
import { useEffect, useState, useCallback } from "react";
import axios from "../utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TvShoes = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tvShoes, setTvShoes] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "SCSDB | TvShoes " + category.toUpperCase();

    const GetTvShoes = useCallback(async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results.length > 0) {
                setTvShoes((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching TV shows:", err.response ? err.response.data : err.message);
        }
    }, [category, page]);

    const refreshHandler = () => {
        setTvShoes([]);
        setPage(1);
        setHasMore(true);
        GetTvShoes();
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    useEffect(() => {
        if (tvShoes.length === 0) {
            GetTvShoes();
        }
    }, [GetTvShoes, tvShoes.length]);

    return tvShoes.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex flex-col md:flex-row items-start md:items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400 mb-3 md:mb-0 mt-3">
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "}
                    Tv Shoes
                    <small className="ml-2 text-sm text-zinc-600">({category})</small>
                </h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-center w-full md:w-[80%] gap-3">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["on_the_air", "popular", "top_rated", "airing_today"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={tvShoes.length}
                next={GetTvShoes}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={tvShoes} title="tv" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default TvShoes;
