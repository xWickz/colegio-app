import { z } from 'zod'

export const materiaSchema = z.object({
    nombre: z.string().min(1, 'Nombre es requerido'),
});

export default materiaSchema;