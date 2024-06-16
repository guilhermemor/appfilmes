
import './Media.css'
import Section from '../components/Section';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { MoviesList } from '../Api/MoviesList';
import { useParams } from 'react-router-dom';
import { TvDetail } from '../Api/TvDetail';
import { GetMediaTrailer } from '../Api/GetMediaTrailer';

import { useContext } from 'react';
import { FalseContext } from '../Context/FalseContext';
import { AuthAddRemoveFav } from '../Api/Firebase/AuthAddRemoveFav';
import { useAuthValue } from '../Context/AuthContext';
import { AuthListFav } from '../Api/Firebase/AuthListFav';

Modal.setAppElement("#root");

const Media = () => {
 //pop out modal
 const [modalIsOpen, setMIsOpen] = useState(false);
 const openModal = () => {
   setMIsOpen(true);
 };
 const closeModal = () => {
   setMIsOpen(false);
 };
 //
//chamo denovo para deixa true pra resetarr nosso contexto pra fechar novamente
 const { popfalse, setPopFalse } = useContext(FalseContext);
 setPopFalse(true)

 
 const { id } = useParams();
 const [data5] = MoviesList({ url: `https://api.themoviedb.org/3/tv/${id}/similar?language=pt-%20BR&page=1` });

 // passou a função pra chamar a serie
const data = TvDetail({id})

//função pra pegar o trialer do filme
const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=pt-BR`
const trailer = GetMediaTrailer({url})
const yturl = trailer.trailer && trailer.trailer.length !== 0
  ? `https://www.youtube.com/embed/${trailer.trailer[0].key}?vq=hd1080&autoplay=1`
  : 'https://www.youtube.com/embed/9DEOJkmZLd8?vq=hd1080&autoplay=1';
//


//função pra add aos fav
const { user } = useAuthValue(); // pegando o user pra usar o uid
const [errormedia, setErrorMedia] = useState();
//chamando a função para add fav
const { addFav,deleteFav, error: authError, loading } = AuthAddRemoveFav();

//chamando a lista atual para checagem
const { dataList: lista, error: ListauthError, loading: ListLoading } = AuthListFav('seriesfav');

//pegando dados para add na lista de fav
const [datafav, setDataFav] = useState(null);
const [jaAdd, setJaAdd] = useState();

useEffect(() => {

    if (data.tv) {
        // Crie as variáveis   
        const poster_path = data.tv.poster_path;
        const title = data.tv.name;
        const original_name = data.tv. original_name;

        // Crie o objeto datafav com as variáveis
        const dataFav = {
            idUser: user.uid,
            id,
            original_name:  original_name,
            poster_path,
            title
        };
        const jaAddS = lista.some(tv => tv.id === dataFav.id && tv.idUser === dataFav.idUser)
        setJaAdd(jaAddS)
        setDataFav(dataFav);
    }
  
}, [data.tv , lista, user, id, jaAdd]);

console.log(datafav)

const AddtoFav = async () => {
    //definindo a base de dados aonde sera salvo as informações
    const cole ='seriesfav'
    //checando se veio o iduser
      if (!datafav.idUser) {
        setErrorMedia('Tente mais tarde')
          return;
      }

      try {
          const res = await addFav(datafav,cole);
          window.location.reload();
      } catch (authError) {
        setErrorMedia('Erro db Tente mais tarde');
      }
};
  const DeletFav = async () =>{
    try {
      const res = await deleteFav('seriesfav',datafav);
      window.location.reload(); 
  } catch (authError) {
    setErrorMedia('Erro db Tente mais tarde'+ authError);
  }

  }

    return (
      <div className="mediageral">
  
        
      <img  className="mediageralimg"src={`https://image.tmdb.org/t/p/original/${data.tv && data.tv.backdrop_path}`}></img>
        
        <div className='mediafilmenome'>
            <img  className='mediafilmenomeimg' src={`https://image.tmdb.org/t/p/original/${data.tv && data.tv.poster_path}`}></img>
             <p>{data.tv && data.tv.adult === false ? <>16</> : <>+18</>}, { data.tv && data.tv.genres[0].name}, CC, AD º 
             {data.tv && data.tv.first_air_date.substring(0, 4)}, 
             Duração: {data.tv && data.tv.episode_run_time[0]} Minutos, {data.tv && data.tv.seasons.length} Temporadas</p>

            <button onClick={openModal}>Assista</button>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="procura" 
            overlayClassName="overlay" classname="content" style={{content: { backgroundColor: 'rgba(0, 0, 0, 0.9)'}
            }} >
              <button className="fechar"onClick={closeModal}>X</button>
              <iframe src={yturl} title="" frameborder="0" allowfullscreen="true" width="98%" height="98%"></iframe>
            </Modal>
            
             <button >Trailer</button>  
             {jaAdd === true ? <button onClick={DeletFav}>Remover Favorito</button> : null}
             {jaAdd === false ? <button onClick={AddtoFav}>+</button> : null}
              <span>{loading && 'Adcionando'}</span> <span>{errormedia && errormedia}</span>


            <p>{data.tv && data.tv.overview}</p>      
        </div> 
      
        {data5 &&  <Section nomeSessao="Você pode gostar tambem" images={data5}/> }
      </div> 
  )
}

export default Media
