import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import PopOutPesquisa from './PopOutPesquisa';

import { useContext } from 'react';
import { FalseContext } from '../Context/FalseContext';
import { useAuthValue } from '../Context/AuthContext';
import {AuthLoginRegister} from '../Api/Firebase/AuthLoginRegister'

import './PopOut.css'


Modal.setAppElement("#root");


function PopOut() {
  // estado de login e logoff aq
  const { user } = useAuthValue();
  const {logout} = AuthLoginRegister();
  
  //contexo pra fechar em qualquer lugar o modal
  const { popfalse, setPopFalse } = useContext(FalseContext);

  //pop out modal
  const [modalIsOpen, setMIsOpen] = useState(false);

  const openModal = () => {
    setMIsOpen(true);
  };

  const closeModal = () => {
    setMIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false); 
// cuida se o context mudar pra false, assim ele seta pra false
  useEffect(()=>{
    if(popfalse===false){
      setMIsOpen(false);
    }
  },[popfalse])


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <div className={`pop-out-container ${isOpen ? 'open' : ''}`}>
          <div className="pop-out-content">
          {user && (<button onClick={logout}>Sair</button>)}
            {!user &&<Link to="/login" className='pagina'><button>Login</button></Link>}
            {!user && <Link to="/selecionaplano"> <button>Cadastrar</button></Link>}
            {user && <Link to="/dashbord"> <button>Minha Conta</button></Link>}
            <button onClick={openModal}>Procurar</button>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="procura" 
            overlayClassName="overlay" classname="content" style={{content: { backgroundColor: 'rgba(10, 10, 10, 0.9)'}
            }} >
              <button className="fechar"onClick={closeModal}>X</button>
              <PopOutPesquisa/>
            </Modal>
          
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default PopOut;
