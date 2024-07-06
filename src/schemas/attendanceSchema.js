import { z } from "zod";

const attendanceSchema = z.object({
  id_usuario: z.number().int(),
  fecha: z.string().refine((val) => !isNaN(Date.parse(val)), "Fecha inválida"),
  hora_entrada: z
    .string()
    .refine(
      (val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
      "Hora de entrada inválida"
    ),
  hora_salida: z
    .string()
    .refine(
      (val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
      "Hora de salida inválida"
    ),
});

export { attendanceSchema };
