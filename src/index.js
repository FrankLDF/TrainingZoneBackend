// importando librerias y middlewares externos
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// imortando midlewares propios
import authMiddleware from "./middlewares/authMidleware.js";

// importando las rutas de los endpoint de las apis
import v1Users from "./v1/routes/users/users.routes.js";
import v1Community from "./v1/routes/communities/community.routes.js"
import v1Auth from "./v1/routes/auth/auth.routes.js"
import v1Attendence from "./v1/routes/attendence/attendence.routes.js"

// configurando dotenv para poder usar variables de entorno
dotenv.config();

const app = express();  // inicializando express
app.disable('x-powered-by') // deshabilita el header que indica el X-Powered-By: Express en una pelicion
const PORT = process.env.PORT ?? 4000;  // variable puerto

//config midelwares
app.use(morgan("dev")); // middleware de informacion de peticiones en la CLI
app.use(cors()); // middleware para definir acceso a peticiones
app.use(express.json());  // para enviar y recibir datos en formato json
app.use(cookieParser())


// estableciendo las rutas disponibles en los distintos enpoint
app.use("/v1/auth", v1Auth);
app.use("/v1/user", authMiddleware, v1Users);
app.use("/v1/membership", authMiddleware, v1Users);
app.use("/v1/attendance", v1Attendence);
app.use("/v1/community", authMiddleware, v1Community);



app.listen(PORT, () =>
  console.log(`server on listen in http://localhost:${PORT}`)
);
