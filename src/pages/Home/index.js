import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

//https://api.themoviedb.org/3/movie/now_playing?api_key=27de0244af6b689982af0d77e6fa633b&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "27de0244af6b689982af0d77e6fa633b",
                    language: "pt-BR",
                    page: 1,
                }
            })
            
    console.log(response.data.results);
        }

        loadFilmes();
    }, [])


    return(
        <div>
            <h2>Bem vindo à pagina Home</h2>
            <Link to="/Filme">Filmes</Link>
        </div>
    );
}
export default Home;