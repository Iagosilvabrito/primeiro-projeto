import express from 'express';
import { v4 as uuidv4 } from 'uuid';



const app = express()
app.use(express.json())

const usuarios = []
const checkUserId = (req,res,next) =>{
  const { id } = req.params

  const index = usuarios.findIndex( usuario => usuario.id === id)
  
  if(index < 0){
    return res.status(404).json({mensage: "TEM N"})
  }
  req.usuarioIndex = index
  req.usuarioId = id

  next()
}

app.get('/usuarios' , (req, res) => {

  console.log("A rota foi chamada")

  return res.json(usuarios)
})

app.post('/usuarios', (req,res ) => {
const {nome, idade} = req.body
const usuario = { id: uuidv4(), nome, idade,}

usuarios.push(usuario)
  return res.status(201).json(usuarios)
})

app.put('/usuarios/:id',checkUserId,(req, res) => {
  
  const { nome, idade } = req.body
  const index = req.usuarioIndex
  const id = req.usuarioId
  
  const updateUsuarios = { id, nome, idade }
  
  
  usuarios[index] = updateUsuarios

  return res.json(updateUsuarios)

})

app.delete('/usuarios/:id',checkUserId, (req, res )=> {
  const index = req.usuarioIndex
  
  usuarios.splice(index,1)

  return res.status(204).json()
  
})

app.listen(3333,()=>{
  console.log("rodando") 
})