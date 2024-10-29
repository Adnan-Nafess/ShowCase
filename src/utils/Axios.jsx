import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTA2NzIwNzU4YmFmOTc0NTUzMzUwNmVkNWIyNzQ0ZCIsIm5iZiI6MTcyOTk1MTc4MC43MTc4NjcsInN1YiI6IjY3MWNlZWQ5YTRhYzhhNDMyYzVjNjlkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aBjaDQtfniB03lJ1rfQ_4LAmRg8ckMNDyhAc96Z4cUI'
    }
})

export default instance;