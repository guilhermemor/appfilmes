import { useState } from 'react';
import './PopOut.css'
import Section from '../components/Section';
import { MoviesList } from '../Api/MoviesList';

const PopOutPesquisa = () => {
const [pesquisa, setPesquisa] = useState('');

  const handleSubimit = (e) =>{
    e.preventDefault();
}
     //chamando filmes e series de acorodo com q query     
let url = `https://api.themoviedb.org/3/search/movie?query=${pesquisa}&include_adult=true&language=pt-BR&page=1`;
    const data = MoviesList({url})

    url = `https://api.themoviedb.org/3/search/tv?query=${pesquisa}&include_adult=true&language=pt-BR&page=1`;
    const data2 = MoviesList({url})
    
  return (
    <div className='popesquisa'>
      <p>O que você esta procurando hoje?</p>
      <form type="text" onSubmit={handleSubimit}>
        <input type="text" placeholder='Digite o que você procura' onChange={(e)=>setPesquisa(e.target.value)}></input>
        {pesquisa && <h2>Resultados correspondentes a: {pesquisa}</h2>}

        {data[0] && <Section nomeSessao={null} images={data[0]}/>}
        {pesquisa && <span>Series</span>}
        {data2[0] &&<Section nomeSessao={null} images={data2[0]}/>}
        
      </form>
    </div>
  )
}

export default PopOutPesquisa
