
import '../App'; 
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FalseContext } from '../Context/FalseContext';
import { useAuthValue } from '../Context/AuthContext';

const GaleryAll = ({ images }) => {
  const { user } = useAuthValue();
  const vetorImage = images

const { popfalse, setPopFalse } = useContext(FalseContext);

  return (
    <div className="galery">

      {vetorImage && vetorImage.map((image) => (
        <>
       {image.original_name &&  <Link to={user ? `/mediatv/${image.id}`: '/login' }>
        <img onClick={()=>setPopFalse(false)} key={image.id} src={`https://image.tmdb.org/t/p/w500/${image.poster_path}`} alt={`${image.title}`} />
        </Link>}

       {!image.original_name &&  <Link to={user ? `/media/${image.id}`:'/login'}>
        <img onClick={()=>setPopFalse(false)} key={image.id} src={`https://image.tmdb.org/t/p/w500/${image.poster_path}`} alt={`${image.title}`} />
        </Link>}
        </>
      ))}
    </div>
  );
};

export default GaleryAll;