# Plan de Pruebas Unitarias

**Nombre de los Estudiantes:** Vicente Lopez e Igor Rojas

**Componente / Módulo Principal:** validaciones, sesion, favoritos, normalizarTexto, carrito, RutaPrivada, ItemCarrito, FormularioProducto.

**Fecha:** 21-10-2026

| ID | Componente (describe) | Caso de Prueba (it / test) | Preparación (Arrange) | Acción (Act) | Resultado Esperado (Assert) | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| PU-001 | validaciones (RUT) | Debe aceptar RUT con puntos y guion (dígito o k) y rechazar los mal formados | Lista de RUT válidos e inválidos | Ejecutar validarRut sobre cada RUT | Los válidos devuelven true y los inválidos false | ✅ Pasa |
| PU-002 | validaciones (contraseña) | Debe exigir 8 caracteres, mayúscula, minúscula y número | Una contraseña correcta y cuatro incorrectas | Ejecutar validarContrasena sobre cada una | La correcta devuelve true y las incorrectas false | ✅ Pasa |
| PU-003 | sesion | Debe guardar la sesión sin la contraseña y borrarla al cerrar sesión | localStorage limpio y un usuario paciente con contraseña | guardarSesion, obtenerSesion y cerrarSesion | La sesión no contiene la contraseña y, tras cerrar sesión, devuelve null | ✅ Pasa |
| PU-004 | favoritos | Debe agregar y quitar un id, y devolver [] si el contenido está dañado | localStorage limpio y el id de producto 5 | alternarFavorito(5) dos veces y luego un texto dañado con obtenerFavoritos | Devuelve [5], luego [] y [] con el contenido dañado | ✅ Pasa |
| PU-005 | normalizarTexto | Debe quitar espacios de los bordes, pasar a minúscula y eliminar tildes | Textos "  Té Matcha " y "PROTEÍNA Vegana" | Ejecutar normalizarTexto sobre cada texto | "te matcha" y "proteina vegana" | ✅ Pasa |
| PU-006 | carrito | Debe acumular las unidades por producto y sumar el total de unidades | Carrito vacío en localStorage | Agregar producto 1 (x2), producto 1 (x3) y producto 4 (x1) | Producto 1 con 5, producto 4 con 1 y total 6 | ✅ Pasa |
| PU-007 | carrito | Debe tratar cantidad inválida como 1, quitar un producto y vaciar el carrito | Carrito con producto 2 (x3) y producto 5 (x1) | Agregar producto 7 con cantidad 0, quitar el 2 y vaciar | Producto 7 con 1, el 2 ya no está y tras vaciar queda [] con total 0 | ✅ Pasa |
| PU-008 | RutaPrivada | Debe dejar ver el contenido solo al admin y redirigir a /login a paciente y sin sesión | MemoryRouter con ruta /login y tres escenarios (admin, paciente, sin sesión) | Renderizar RutaPrivada en cada escenario | Admin ve el contenido; paciente y sin sesión van a /login | ✅ Pasa |
| PU-009 | ItemCarrito | Debe mostrar los datos del producto y avisar qué producto quitar | Producto con cantidad 2 y onQuitar simulado | Renderizar y hacer clic en "Quitar" | Se ve nombre y cantidad; onQuitar se llama una vez con el id | ✅ Pasa |
| PU-010 | FormularioProducto | Debe rechazar un precio inválido con alert y aceptar datos válidos | onAgregar y alert simulados | Enviar con precio 0 y luego con precio válido | Con 0 hay alert y no se llama onAgregar; con datos válidos se llama una vez | ✅ Pasa |
