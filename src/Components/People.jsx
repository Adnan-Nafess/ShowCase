import { useNavigate } from "react-router-dom";
import Topnav from "./Templates/Topnav";
import { useEffect, useState, useCallback } from "react";
import axios from "../utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Person = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [person, setPerson] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = `SCSDB | Person ${category.toUpperCase()}`;

    const getPerson = useCallback(async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);

            if (data.results.length > 0) {
                setPerson((prevState) => [...prevState, ...data.results]);
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
        setPerson([]);
        setHasMore(true);
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    useEffect(() => {
        if (person.length === 0) {
            getPerson();
        }
    }, [getPerson, person]);

    return person.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex flex-col md:flex-row items-start md:items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400 mb-3 md:mb-0 mt-3">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    People
                </h1>
                <div className="flex items-center w-full md:w-[80%] gap-3">
                    <Topnav />
                </div>
            </div>

            <InfiniteScroll
                dataLength={person.length}
                next={getPerson}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={person} title="person" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Person;
