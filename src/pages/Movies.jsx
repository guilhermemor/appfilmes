import styles from './SeriesMovies.module.css'
import GaleryAll from '../components/GaleryAll'
import { MoviesList } from '../Api/MoviesList'
import { useState } from 'react'

const Movies = () => {

const [genreId, SetGenreId ] = useState(0)

const SetGen = (num) =>{
    SetGenreId(num);
}

//trazendo varios filmes pra PAGINAS DE FILMES
const [data] = MoviesList({url:'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1'})

const [data2] = MoviesList({url:'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=2'})

const [data3] = MoviesList({url: 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=2'})

const [data4] = MoviesList({url: 'https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=2'})

const [data5] = MoviesList({url: 'https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=4'})

const [data6] = MoviesList({url:'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=3'})

// junta todos de uma vez
const dataAll = [...data, ...data2, ...data3, ...data4, ...data5, ...data6];

//função de filtragem por genero
const IndexByGenre = (data, genreId) => {
    // Aqui ele retorna todo o vetor pq 0 é sem filtro de genero
    if (genreId===0){
        return data;
    }else{
        // Filtrar os itens de data com base em genreId
        const temp = data.filter(item => item.genre_ids.includes(genreId));
        return temp;

    }
    
}

  return (
    <div className={styles.list}>
      <h2>Filmes disponiveis no AppFilmes</h2>
        <div className={styles.geners}>
            <button onClick={()=>SetGen(0)}>Todos os Filmes</button>  
            <button onClick={()=>SetGen(28)}>Ação</button>          
            <button onClick={()=>SetGen(18)}>Drama</button>
            <button onClick={()=>SetGen(10749)}>Romance </button >
            <button onClick={()=>SetGen(35)}>Comedia</button>
            <button onClick={()=>SetGen(12)}>Aventura</button> 
            <button onClick={()=>SetGen(27)}>Terror</button> 
            <button onClick={()=>SetGen(16)}>Animação</button>
        </div>
                    <GaleryAll images={IndexByGenre(dataAll, genreId)} />
                   
    </div>
            )
}

export default Movies
