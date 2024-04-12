import './filme-info.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import api from '../../services/api';
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
function Filme(){

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate();

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
                navigation("/", { replace: true});
                return;
            })
        }

        loadFilme();
    }, [navigation, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeFlix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id );

        if(hasFilme){
            alert("Esse filme ja foi adicionado na lista");
            return;
        }else

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso!");
    }

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
           
            <strong>Avaliação: {filme.vote_average.toFixed(1)}/10</strong>
           
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )

    
}
export default Filme;