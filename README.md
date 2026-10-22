# NutriVida - Migración a React

Aplicación web de la clínica de nutrición **NutriVida**, migrada de HTML, CSS y JavaScript a **React + Vite**.

## Datos del curso

| | |
| :--- | :--- |
| **Sección** | 003D |
| **Asignatura** | Desarrollo Fullstack II |
| **Docente** | Victor Andrade |
| **Grupo** | 12 |
| **Integrantes** | Vicente Lopez e Igor Rojas |

---

## Contexto del caso

NutriVida es una clínica de nutrición y dietética fundada en 2016 en Temuco, Región de La Araucanía. Cuenta con 4 nutricionistas que atienden pacientes con distintos objetivos: pérdida de peso, control de enfermedades metabólicas, nutrición deportiva y alimentación vegetariana o vegana.

El sitio permite a los pacientes:

- Conocer la clínica y sus servicios.
- Revisar y comprar productos y suplementos naturales.
- Agendar en línea una cita con el nutricionista que prefieran.

Esta versión migra por completo el proyecto original (HTML, CSS y JS) a componentes de React, **manteniendo el diseño y la estructura visual del original**.

> **Nota:** es un proyecto Front-End. No hay base de datos ni servidor: los usuarios son estáticos, los datos de salud solo se validan (no se guardan) y los cambios del Panel de Control viven en memoria.

---

## Tecnologías

- **React 19** y **Vite**
- **react-router-dom**: navegación entre páginas sin recargar
- **React Bootstrap**: estructura de los formularios (solo los componentes; el CSS de Bootstrap no se importa para no alterar el diseño original)
- **Font Awesome 4.7**: íconos
- **Vitest** y **Testing Library**: pruebas (ver `Plan de pruebas.md`)

---

## Cómo está hecho (lógica de React + Vite)

- **Componentes de una sola responsabilidad.** Cada pieza de la interfaz es un componente pequeño (tarjetas, galerías, campos de formulario, calendario, etc.). Las *views* solo ordenan componentes y les entregan datos y funciones.
- **Datos separados de la interfaz.** Productos, nutricionistas, horarios, usuarios y opciones de formularios viven en `src/data/`.
- **Lógica reutilizable en `utils/`.** Validaciones, carrito, sesión, favoritos y formato de precios están en un solo lugar, compartidos por varias páginas.
- **Estado con `useState`** en las funcionalidades interactivas:
  1. Carrito de compras (contador, agregar y quitar).
  2. Filtrado dinámico del catálogo (buscador por nombre y categoría).
  3. Favoritos con corazón y filtro "Solo favoritos".
  4. Panel de Control: agregar y eliminar productos en memoria.
  5. Asistente de 3 pasos para agendar citas (nutricionista, fecha y hora, confirmación).
- **Rutas con `react-router-dom`.** Todas las rutas se definen en `App.jsx`. El detalle del producto usa una ruta dinámica (`/producto/:id`) y cualquier dirección desconocida muestra la página 404.
- **Autenticación simulada.** El login valida contra usuarios estáticos y guarda la sesión en `localStorage` (nunca la contraseña). La ruta `/admin` está protegida con `RutaPrivada`: solo entra el rol administrador.
- **Persistencia ligera con `localStorage`:** sesión, carrito y favoritos se conservan al recargar la página.
- **Imágenes con `import.meta.glob`.** Vite importa de una vez todas las imágenes de una carpeta, en vez de escribir un import por cada una.
- **Validaciones de formularios** en Registro, Inicio de Sesión, Agendar y Panel, con campos adicionales de contexto de salud (peso, estatura, cintura, alergias, enfermedad, patrón alimenticio, objetivo, actividad física, sueño y estrés).
- **Estilos.** `App.css` contiene los estilos globales y cada página tiene su propio archivo `_Style.css` en `src/assets/styles/`.

---

## Estructura del proyecto

```
nutrivida/
├── public/                 Video, favicon y archivos estáticos
├── src/
│   ├── assets/
│   │   ├── img/            Imágenes (banner, productos, nutricionistas, planes)
│   │   └── styles/         CSS de cada página (Inicio_Style.css, etc.)
│   ├── components/         Componentes reutilizables (tarjetas, formularios, calendario...)
│   ├── data/               Datos de la app (productos, usuarios, nutricionistas, horarios...)
│   ├── tests/              Pruebas unitarias con Vitest
│   ├── utils/              Funciones de apoyo (validaciones, carrito, sesión, favoritos...)
│   ├── views/              Una vista por cada página
│   ├── App.css             Estilos globales
│   ├── App.jsx             Definición de rutas
│   └── main.jsx            Punto de entrada
├── index.html
├── vite.config.js
└── package.json
```

---

## Páginas

| Ruta | Vista | Descripción |
| :--- | :--- | :--- |
| `/` | **Inicio** | Presentación de la clínica, lo que ofrece, categorías de productos, Best Sellers y acceso a agendar una hora. |
| `/productos` | **Catálogo de Compras** | Listado de los 25 productos con buscador por nombre, filtro por categoría, favoritos y botón para añadir al carrito. |
| `/producto/:id` | **Detalle de Producto** | Galería de imágenes, descripción, precio, selector de cantidad, favorito y productos relacionados. Si el id no existe, muestra la página 404. |
| `/login` | **Inicio de Sesión** | Valida correo y contraseña contra los usuarios estáticos y crea la sesión. |
| `/registro` | **Registro de Usuario** | Formulario con validaciones y datos de salud. Solo valida; no guarda usuarios. |
| `/agendar` | **Agendar Cita** | Asistente de 3 pasos: elegir nutricionista, elegir fecha y hora, y confirmar con los datos de salud. Requiere sesión iniciada. |
| `/carrito` | **Carrito de Compras** | Productos agregados, resumen con total, opción de quitar y compra simulada (exige sesión). |
| `/perfil` | **Mi Perfil** | Datos del usuario con sesión, cierre de sesión y, para el administrador, acceso al Panel de Control. |
| `/admin` | **Panel de Control** | Solo administrador. Estadísticas del catálogo, agregar productos y eliminarlos (en memoria). |
| `*` | **Error 404** | Página que se muestra cuando la dirección no existe. |

---

## Usuarios de prueba

Datos ficticios para probar el inicio de sesión:

| Rol | Correo | Contraseña |
| :--- | :--- | :--- |
| Administrador | `admin@duocuc.cl` | `Admin1234` |
| Paciente | `paciente@gmail.com` | `Paciente1234` |

---

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Generar la versión de producción
npm run build
```
