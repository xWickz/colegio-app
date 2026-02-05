Alumnos.vue
- Terminar las tablas
- Replicar en Profesores.vue
- Agregar mas campos
1. nombre
2. cedula
3. materias_asignadas
4. grado
^ hay que hacer los pagos (30 dias para pagar, ya uqe se paga mensual)

Agregar Materias.vue
donde: 
- listado de materias disp
* id (auto key), id materia, nombre, profesor asignado (id), seccion (o sin), grado disponible (id del grado/año que esta disp)

Home.vue
donde:
- estadisticas
- lista de profe y alumnos
- lista de materias

pagos.vue
donde:

GRADOS:
1er grado (1)
2do grado (2)
3er grado (3)
4to grado (4)
5to grado (5)
6to grado (6)
1er año (7)
2do año (8)
3er año (9)
4to año (10)
5to año (11)

Alumnos
Agregar campos: nombre completo, cédula, sección/año, materias asignadas, fecha de nacimiento.
Implementar la asignación de materias al alumno (seleccionar materias disponibles).
Barra de búsqueda para buscar alumnos y asignar materias.
Agregar notas de las materias (requiere una tabla aparte con FK a cédula y materia, y 3 notas por materia).
Validar datos con zod antes de agregar/editar.
Mejorar la UX y accesibilidad (aria-labels, roles).
Componentizar modales y formularios si crecen.
Centralizar paginación y manejo de errores.

Materias
Campos: nombre, ID, año/grado, rango de años si aplica.
Asignar materias a alumnos y profesores desde la vista de materia.
Barra de búsqueda para buscar alumnos y asignar materia.
Validar datos con zod antes de agregar/editar.
Componentizar modales y paginación.
Mejorar la UX y accesibilidad.

General
Implementar estadísticas en el menú principal (N° de alumnos, profesores, materias, promedios, etc.).
Replicar buenas prácticas en Profesores.vue y otros módulos.
Optimizar y limpiar el código (DRY, manejo de errores, servicios, utils).
¿Quieres que te ayude a organizar estos TODO en un archivo o lista para tu proyecto?