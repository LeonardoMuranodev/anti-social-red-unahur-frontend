// Funcion para conectar con la BD de redis
const {createClient} = require("redis")
require("dotenv").config()

const redisClient = createClient( {
    url: process.env.REDIS_URI || "redis://localhost:6379"
})

const conectarRedis = async () => {
    try {
        // Hay que pasarle la URL para conectarse a la BD por var de entornos
        await redisClient.connect()
        console.log("Conexion exitosa con Redis")
    } catch(error) {
        console.error("Error a la hora de conectar con Redis: ", error)
    }
}

module.exports = {
    redisClient,
    conectarRedis
}