// Funcion para conectar con la BD de redis
import {createClient} from "redis"
import dotenv from "dotenv"

dotenv.config()

export const redisClient = createClient( {
    url: process.env.REDIS_URI || "redis://localhost:6379"
})

export const connectRedis = async () => {
    try {
        // Hay que pasarle la URL para conectarse a la BD por var de entornos
        await redisClient.connect()
        console.log("Conexion exitosa con Redis")
    } catch(error) {
        console.error("Error a la hora de conectar con Redis: ", error)
    }
}