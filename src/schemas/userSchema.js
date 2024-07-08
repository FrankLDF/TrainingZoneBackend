import { z } from "zod";

// schema para validar los datos que se insertaran en la tabla usuarios
const userSchema = z.object({
  tipo_usuario: z.number().int(),
  nombre: z.string().max(25, "Nombre debe tener un máximo de 25 caracteres"),
  apellido: z
    .string()
    .max(50, "Apellido debe tener un máximo de 50 caracteres"),
  direccion: z
    .string()
    .max(50, "Dirección debe tener un máximo de 50 caracteres"),
  telefono: z
    .string()
    .max(25, "Teléfono debe tener un máximo de 25 caracteres")
    .optional(),
  email: z
    .string()
    .email("Formato de email inválido")
    .max(50, "Email debe tener un máximo de 50 caracteres")
    .optional(),
  fecha_nacimiento: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Fecha de nacimiento inválida"),
  usuario: z.string().max(25, "Usuario debe tener un máximo de 25 caracteres"),
  contrasena: z
    .string()
    .min(6, "Contraseña debe tener al menos 6 caracteres")
    .max(250, "Contraseña debe tener un máximo de 250 caracteres"),
  fecha_registro: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Fecha de registro inválida"),
  estado: z.number().int(),
});

export const validateUser = input => {
  return userSchema.safeParse(input)
}

// export { userSchema };
