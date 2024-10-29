import axios from "../utils/Axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Templates/Dropdown";
import Topnav from "./Templates/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Templates/Cards";
import Loading from "./Loading";

const Popular = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = `SCSDB | Popular ${category.toUpperCase()}`;

    const GetPopular = useCallback(async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`);

            if (data.results.length > 0) {
                setPopular((prevState) => [...prevState, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error", err.response ? err.response.data : err.message);
        }
    }, [category, page]);

    const refreshHandler = () => {
        setPage(1);
        setPopular([]);
        setHasMore(true);
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    useEffect(() => {
        if (popular.length === 0) {
            GetPopular();
        }
    }, [GetPopular, popular]);

    return popular.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex flex-col md:flex-row items-start md:items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400 mb-3 md:mb-0 mt-3">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Popular
                    <small className="ml-2 text-sm text-zinc-600">({category})</small>
                </h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center w-full md:w-[80%] gap-3">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["movie", "tv"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={popular.length}
                next={GetPopular}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={popular} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Popular;
