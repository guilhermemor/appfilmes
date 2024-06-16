import React from 'react'
import { useAuthValue } from '../Context/AuthContext';
import styles from './Dashbord.module.css'
import GaleryAll from '../components/GaleryAll';
import { AuthListFav } from '../Api/Firebase/AuthListFav';

const Dashbord = () => {
  const { user } = useAuthValue();

  const coletiondb ='moviesfav'
  const coletiondbseries ='seriesfav'


  const { dataList: lista, error: authError, loading } = AuthListFav(coletiondb);
  const { dataList: listaSeries, error: authErrorSeries, loading: loadingSeries } = AuthListFav(coletiondbseries);

  const data = lista.filter(item => item.idUser === user.uid);
  const dataSeries = listaSeries.filter(item => item.idUser === user.uid);

  return (
    <div className={styles.dash}>
      <h1>Oi, {user.displayName}</h1>
      <p>Email cadastrado: {user.email}</p>
      <h4>Data de Cadastro: {user.metadata.creationTime.substring(0, 17)}</h4>
      <h2>Favoritos:</h2>
      {loading && <p>Carregando...</p>}
      {data.length === 0 ? (
    <p>Você ainda não tem nenhum filme favorito, navegue pelo app e adicione agora!</p>) : ('')}
      {data &&  <h3>Filmes:</h3>}
      {data && <GaleryAll images={data}></GaleryAll>}
      
      {loadingSeries && <p>Carregando...</p>}
      {dataSeries.length === 0 ? (
    <p>Você ainda não tem nenhuma serie favorita, navegue pelo app e adicione agora!</p>) : ('')}
      {dataSeries &&  <h3>Series:</h3>}
      {dataSeries && <GaleryAll images={dataSeries}></GaleryAll>}
    </div>
  )
}

export default Dashbord
