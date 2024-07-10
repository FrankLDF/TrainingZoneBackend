import { createLoginUser } from "../../models/mySql/auth/authModel.js";
import { parcialValidateUser } from "../../schemas/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
export const loginUser = async (req, res) => {
    
        // validacion de la existencia de los datos 
        const validateData = await parcialValidateUser(req.body)
    if (!validateData.success) {
        res.json({
            "message": "Formato de datos incorrectos" 
        
        })
        return
    }
    
    const { usuario, contrasena } = validateData.data

    if (usuario === undefined || contrasena === undefined) {
        res.json({ message: "Faltan datos" });
        return
    }
        
        // pasar datos al modelo para iniciar la seccion
        const resultLogin = await createLoginUser(usuario, contrasena)
    
        // capturar ecepcion de que no haya podido iniciar session
        if (!resultLogin.success) {
            res.json(resultLogin)
            return
        }
    
        const token = jwt.sign(
          { id_usuario: resultLogin.user.id_usuario, usuario: resultLogin.user.usuario, tipo_usuario: resultLogin.user.tipo_usuario },
          SECRET_JWT_KEY,
          { expiresIn: "18h" } // expiracion del token
    );
    
    
    res
      .cookie("acces_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        sameSite: "strict",
      })
      .json({ resultLogin });
    
}

export const logoutUser = (req, res) => {
    res.clearCookie("acces_token");
    res.json({ message: "Cierre de sesión exitoso" });
}

