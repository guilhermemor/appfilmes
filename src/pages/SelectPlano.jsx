import './SelectPlano.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SelectPlano = () => {
  return (
    <motion.div 
    initial={{x:  1000 }}
    animate={{ x:0 }} 
    exit={{x: -window.innerWidth}}>
    <div className="telaPlano">
      <h1>Selecione um dos plano abaixo:</h1>
      <div className='opcs'>
      <Link to={`/cadastro/Stardard`}>
        <div className='Plano'>
        <h2>Plano Stardard</h2>
        <p>O Plano Básico é projetado para oferecer uma entrada acessível ao vasto mundo de filmes e séries, ideal para usuários que desejam explorar conteúdos de qualidade a um preço econômico.</p>
        </div></Link>
        <Link to={`/cadastro/Medium`}>
        <div className='Plano'>
        <h2>Plano Medium</h2>
        <p>O Plano Médio oferece um equilíbrio perfeito entre qualidade e custo, proporcionando uma experiência de visualização aprimorada com recursos adicionais e maior flexibilidade para os usuários.</p>
        </div></Link>

        <Link to={`/cadastro/UltraSun`}>
        <div className='Plano'>
        <h2>Plano Ultra</h2>
        <p>O Plano Premium é o mais completo e avançado, oferecendo uma experiência de entretenimento de alta qualidade com recursos superiores e máxima flexibilidade para os usuários mais exigentes</p>
        </div></Link>

      </div>
    </div>
 </motion.div>
  )
}

export default SelectPlano
