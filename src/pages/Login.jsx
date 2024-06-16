import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Login.css'
import '../App.css'
import { AuthLoginRegister } from '../Api/Firebase/AuthLoginRegister';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] =  useState("");
  const [error, setError] = useState("");
  
  const { login, error: authError, loading } = AuthLoginRegister();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError("");
  
    if (email === "" & password === ""){
     setError('Preencha os campos') 
    }
    const user = {
      email,
      password,
    };
  
    const res = await login(user);
  
    console.log(res);
  };

  useEffect(() => {
    console.log(authError);
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <motion.div 
    initial={{x:  900 }}
    animate={{ x:0 }} 
    exit={{x: -window.innerWidth}}>
      <div className='TelaLogin'>
         <h1>Começar</h1>
         <form onSubmit={handleSubmit}>
         <h2>Login</h2>
         <p>Entre com email e senha para logar no AppFilmes</p>
          <input type="text" placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder='Senha' required onChange={(e)=>setPassword(e.target.value)}/>
          <button>Entrar</button>
          <Link to="/"><p className="senha">Lembrar senha</p></Link>
          <Link to="/selecionaplano"><p className="senha">Novo no App? Cadastre-se Agora</p></Link>
          <p className='error'>{error}</p>
          {loading && <p p className='wait'>Espere</p>}
          
         </form>
       </div></motion.div>
     )
}

export default Login 
