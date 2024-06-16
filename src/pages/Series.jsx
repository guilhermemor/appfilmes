import styles from './SeriesMovies.module.css'
import GaleryAll from '../components/GaleryAll'
import { MoviesList } from '../Api/MoviesList'
import { useState } from 'react'

const Series = () => {

const [genreId, SetGenreId ] = useState(0)

const SetGen = (num) =>{
    SetGenreId(num);
}

//trazendo varios filmes pra PAGINAS DE FILMES
const [data] = MoviesList({url:'https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1'})

const [data2] = MoviesList({url:'https://api.themoviedb.org/3/tv/airing_today?language=pt-BR&page=1'})

const [data3] = MoviesList({url: 'https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=2'})

const [data4] = MoviesList({url: 'https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR&page=1'})

const [data5] = MoviesList({url: 'https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR&page=3'})

const [data6] = MoviesList({url:'https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=1'})

const [data7] = MoviesList({url:'https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=2'})

// junta todos de uma vez
let dataAll = [...data7,...data, ...data2, ...data3, ...data4, ...data5, ...data6];

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
      <h2>Series disponiveis na Sunshine</h2>
        <div className={styles.geners}>
        <button onClick={()=>SetGen(0)}>Todos as Series</button>   
            <button onClick={()=>SetGen(10759)}>Ação e Aventura</button>          
            <button onClick={()=>SetGen(18)}>Drama</button>
            <button onClick={()=>SetGen(10764)}>Reality </button >
            <button onClick={()=>SetGen(35)}>Comedia</button>
            <button onClick={()=>SetGen(80)}>Crime</button> 
            <button onClick={()=>SetGen(9648)}>Misterio</button> 
            <button onClick={()=>SetGen(16)}>Animação</button>
        </div>
                    <GaleryAll images={IndexByGenre(dataAll, genreId)} />
                   
    </div>
            )
}

export default Series
