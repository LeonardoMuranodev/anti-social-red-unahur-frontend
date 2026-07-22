import express from "express";
const app = express();
import cors from 'cors';
import {connectDB} from "./config/db.js";
import { connectRedis } from "./config/redis.js";

import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" assert { type: "json" };

import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', // front
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

import { router as postRouter } from "./routes/post.routes.js";
import { router as userRouter } from "./routes/user.routes.js";
import { router as tagRouter } from "./routes/tag.routes.js";
import { router as commentRouter } from "./routes/comment.routes.js";
import { router as followRouter } from "./routes/follow.routes.js";


app.use("/publicaciones", postRouter);
app.use("/usuarios", userRouter);
app.use("/etiquetas", tagRouter);
app.use("/comentarios", commentRouter);
app.use("/seguidos", followRouter);


app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));


app.use('/uploads', express.static('uploads'));

connectRedis();
connectDB(); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});