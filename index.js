const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server} = require('socket.io')
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
})

app.get('/', (req,res)=>{
    res.send('<h1>Hola Mundo</h1>')
})
var cont=0;
io.on('connection', socket =>{
    console.log('Nueva conexión', socket.id)
    if(cont%2==0){
        socket.emit('valorJugador', {xOo:"X"})
    }
    else{
        socket.emit('valorJugador', {xOo:"O"})
    }
   cont++;
    socket.on('espacio', (data)=>{
        console.log(data.b)
        io.emit('asigEspacio', {esp:data.b})
        
        })
        socket.on('valorEspacio', (data)=>{
            console.log(data.v)
            io.emit('asigValorEspacio', {vesp:data.v})
            
            })
        
})

server.listen(3000, ()=>{console.log('Server inicializado')})