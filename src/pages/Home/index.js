import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            <h2>Bem vindo à pagina Home</h2>
            <Link to="/Filme/321">Filmes</Link>
        </div>
    );
}
export default Home;