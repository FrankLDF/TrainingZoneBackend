import { z } from "zod";

const communitySchema = z.object({
  admin: z.number().int(),
  nombre: z.string().max(50, "Nombre debe tener un máximo de 50 caracteres"),
  descripcion: z
    .string()
    .max(150, "Descripción debe tener un máximo de 150 caracteres"),
  fecha_creacion: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Fecha de creación inválida"),
});

export { communitySchema };
