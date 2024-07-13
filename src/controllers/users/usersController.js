import bcrypt from "bcrypt";
import { validateUser } from "../../schemas/userSchema.js";
import { insertNewUser, getAllUsers } from "../../models/mySql/users/userModels.js";


// funcion controlador para registrar usuarios (admin)
export const registerUser = async (req, res) => {
    
  // llamada a la funcion del schema que valida los datos provinientes del cliente
    const userData = validateUser(req.body);

    // validar que los campos esten como se espera
    if (!userData.success) {
      return res.status(400).json({ error: userData.error.errors });
    }
    
    // encriptar la contrasena del user
    const hashedPassword = await bcrypt.hash(userData.data.contrasena , 10);
    userData.data.contrasena = hashedPassword;


  // llamada a la funcion del modelo que guarda al usuario
    const result = await insertNewUser(userData.data);
    res.status(201).json(result);

};

// funcion controlador para obtener tos los usuarios (admin)
export const getUsers = async (req, res) => {
  const result = await getAllUsers();

  if (result.success) {
    res.status(200).json(result.users);
  } else {
    res.status(500).json({ success: false, message: result.message });
  }
};