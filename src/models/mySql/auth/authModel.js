import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export const createLoginUser = async (username, password) => {
try {
    // Buscar al usuario por nombre de usuario
    const user = await prisma.usuarios.findFirst({
      where: { usuario: username },
    });

    if (!user) {
      // Si el usuario no existe
      return { success: false, message: "Usuario no encontrado" };
    }

    // Validar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.contrasena);

    if (!passwordMatch) {
      // Si la contraseña no coincide
      return { success: false, message: "Contraseña incorrecta" };
    }

    // Aquí hay que generar un token JWT u otra lógica de autenticación
    // Por ejemplo, retornar el usuario con éxito
    return { success: true, message: "Inicio de sesión exitoso", user };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return { success: false, message: "Error al iniciar sesión" };
  }
};