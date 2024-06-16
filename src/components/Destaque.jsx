import '../App.css';
import destaque from '../assents/destaque.png'
import { Link } from 'react-router-dom';
import { useAuthValue } from '../Context/AuthContext';

const Destaque = ({textoDestaque, paragrafos, paragrafos2}) => {
  const { user } = useAuthValue();
  return (
    <div className="destaque"><img src={destaque}></img>
    <div className="destaqueTexto">
     <h1>{textoDestaque}</h1>
     <h3>{paragrafos}</h3>
     <h3>{paragrafos2}</h3>
     <Link to={user ? `/media/1072790`:'/login'}><button className="buttons">Assista agora mesmo</button></Link>
     </div>
    </div>
  )
}

export default Destaque