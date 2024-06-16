
import Galery from './Galery'
import GaleryAll from './GaleryAll'

const Section = ({nomeSessao,images}) =>{
  
    return (
    <div className="section">
        <h2> {nomeSessao}</h2>
        {nomeSessao &&<Galery images={images}></Galery>}
        {!nomeSessao &&<GaleryAll images={images}></GaleryAll>}
    </div>
  )
}

export default Section