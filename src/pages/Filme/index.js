import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../services/api';
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

function Filme(){

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "27de0244af6b689982af0d77e6fa633b",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() =>{
                console.log("Filme não encontrado");
            })
        }

        loadFilme();

        return () => {
            console.log("O componente foi desmontado");
        }
    }, []);

    if(loading){
        return(
            <div className="filme-info">
                <h2>Carregando detalhes...</h2>
            </div>
        );
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span><br/>
            <strong>Avaliação: {filme.vote_average}/10</strong>
        </div>
    )

    
}
export default Filme;