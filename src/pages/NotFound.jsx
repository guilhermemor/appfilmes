import React from 'react'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <motion.div 
    initial={{x:  1000 }}
    animate={{ x:0 }} 
    exit={{x: -window.innerWidth}}>
      <br></br><br></br><br></br><br></br><br></br>
      <h2> 404 pagina não existente</h2>
    </motion.div>
  )
}

export default NotFound
