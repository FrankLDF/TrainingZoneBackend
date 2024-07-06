import { z } from "zod";

const loginSchema = z.object({
  usuario: z.string().max(25, "Usuario debe tener un máximo de 25 caracteres"),
  contrasena: z
    .string()
    .min(6, "Contraseña debe tener al menos 6 caracteres") 
    .max(25, "Contraseña debe tener un máximo de 25 caracteres"),
});

export { loginSchema };
