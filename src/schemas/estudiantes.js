import { z } from 'zod'

export const EstudianteSchema = z.object({
    cedula: z.number().int().min(1, 'Cédula es requerida'),
    nombre: z.string().min(1, 'Nombre es requerido')
});

export default EstudianteSchema;