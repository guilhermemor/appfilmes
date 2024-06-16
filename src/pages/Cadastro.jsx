import './Cadastro.css'
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion'
import { useState,useEffect } from 'react';

import {AuthLoginRegister} from '../Api/Firebase/AuthLoginRegister'

const Cadastro = () => {

  const {createUser, error: authError, loading} = AuthLoginRegister();

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [rpassword, setRPassword] = useState('')
const [error, setError] = useState('')
  
  const {plan}  = useParams();

    const handleSubmit = async (e) =>{
      e.preventDefault();
      if(password!==rpassword){
        setError('As senhas precisam ser iguais')
        return
       }else if(name==='' || email===''){
        setError('Preencha os campos')
       }else if(password==='' || rpassword===''){
        setError('Preencha os campos')
       }

          const user = {
            email,
            password,
            name
          }
          
          const res = await createUser(user)
    }
    useEffect(()=>{
      if(authError){
        setError(authError)
      }
    }, [authError])

    return (
      <motion.div 
    initial={{x:  window.screenX }}
    animate={{ x:0 }} 
    exit={{x: -window.innerWidth}}>
      <div className='Telacad'>
         <h1>Plano selecionado: {plan}</h1>
         <form onSubmit={handleSubmit}>
  
          <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Nome'/>
          <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Email' />
          <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Senha' />
          <input onChange={(e)=>setRPassword(e.target.value)} type="password" placeholder='Repita Senha'/>
          <button>Cadastrar</button>
          <p className='error'>{error}</p>
          {loading && <p p className='wait'>Espere</p>}
         </form>
         <p>Ao selecionar “Criar conta”, você confirma que tem 18 anos de idade ou mais e concorda com nossos Termos de Usoe nossa Política de Privacidade, permitindo que o AppFilmes suas respectivas Afiliadas utilizem suas informações para enviar atualizações, anúncios e ofertas. Se você permitir que uma criança use esta conta, precisaremos tratar as informações pessoais dela para fornecer os serviços. Para obter mais informações, consulte a Política de Privacidade Infantil.</p>
       </div></motion.div>
       )
  }
  

export default Cadastro
