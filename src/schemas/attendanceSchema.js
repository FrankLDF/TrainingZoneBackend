import { z } from "zod";

const attendanceSchema = z.object({
  id_usuario: z.number().int().positive(),
  fecha: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha inválida",
  }),
  hora_entrada:z.string().refine((value) => {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return regex.test(value);
}, {
  message: 'Formato de hora_entrada inválido. Debe ser YYYY-MM-DD HH:mm:ss',
}),
  hora_salida: z.string().refine((value) => {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return regex.test(value);
}, {
  message: 'Formato de hora_salida inválido. Debe ser YYYY-MM-DD HH:mm:ss',
})
});


export const validateAttendance = input => {
  return attendanceSchema.safeParse(input)
}


