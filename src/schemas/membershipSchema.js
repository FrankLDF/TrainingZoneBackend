import { z } from "zod";

const membershipSchema = z.object({
  tipo_membresia: z.number().int(),
  id_usuario: z.number().int(),
  fecha_inicio: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Fecha de inicio inválida"),
  proximo_pago: z
    .string()
    .optional()
    .refine(
      (val) => val === null || !isNaN(Date.parse(val)),
      "Próximo pago inválido"
    ),
  estado: z.number().int(),
});

export { membershipSchema };
