# To-Do List Cyberpunk 🕹️

**Lista de tareas con estética cyberpunk** creada como proyecto pequeño de frontend. Aplicación ligera que permite añadir, marcar como completadas y eliminar tareas. Las tareas se persisten en el navegador usando `localStorage`.

---

## ✨ Características

- Interfaz retro-futurista con efectos "glitch" y luces neón.
- Añadir tareas escribiendo en el input y pulsando `INITIALIZE` o `Enter`.
- Marcar tareas como completadas con un clic.
- Eliminar tareas con el botón `X`.
- Persistencia local: las tareas se guardan en `localStorage` bajo la clave `cyberpunkTasks`.

---

## 🗂 Estructura del proyecto

- `index.html` — HTML principal.
- `style.css` — Estilos y animaciones (efecto escaneo, glitch, neon).
- `script.js` — Lógica de añadir, borrar, alternar y persistir tareas.
- `tests/script.test.js` — Tests unitarios con Jest (entorno `jsdom`).
- `README.md` — Este archivo.

---

## 🚀 Uso local

1. Abrir `index.html` directamente en el navegador (doble clic) o servir la carpeta con un servidor estático (recomendado para evitar restricciones de CORS en extensiones):

```bash
# ejemplo con http-server (si tienes Node.js)
npx http-server .
# o usando Python 3
python3 -m http.server 8080
```

2. Accede a `http://localhost:8080` (o abre el archivo `index.html` localmente).
3. Escribe una tarea en el input y presiona `INITIALIZE` o `Enter`.
4. Haz clic sobre una tarea para marcarla como completada y usa el botón `X` para eliminarla.

---

## 🧪 Tests

Este proyecto incluye tests en `tests/script.test.js` y está preparado para ejecutarse con **Jest** y `jsdom`.

Si aún no tienes un `package.json`, puedes inicializar y ejecutar los tests así:

```bash
# inicializar npm (si no existe)
npm init -y
# instalar Jest como dependencia de desarrollo
npm install --save-dev jest
# ejecutar jest directamente con npx
npx jest --verbose
```

O añade un script de test en `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

y luego:

```bash
npm test
```

Los tests usan el entorno `jsdom` y validan funciones clave en `script.js` como `addTask` y `toggleTask`.

---

## 🛠 Desarrollo

- Código principal en `script.js`. Funciones importantes:
  - `loadTasks()`/`saveTasks()` — carga y guarda en `localStorage`.
  - `addTask()` — añade una nueva tarea (ignora cadenas vacías o solo espacios).
  - `toggleTask(id)` — cambia `completed` para una tarea.
  - `deleteTask(id, event)` — elimina una tarea (previene propagación para no alternar al eliminar).

- Estilos en `style.css` con variables CSS para colores neon y animaciones.

---

## 🤝 Contribuir

¡Contribuciones bienvenidas! Algunas ideas:

- Añadir ordenación/filtros (todas, activas, completadas).
- Añadir edición inline de tareas.
- Añadir soporte para persistencia remota (API/backend).

Pasos para contribuir:
1. Haz fork del repositorio.
2. Crea una rama con tu cambio: `git checkout -b feat/nueva-funcion`.
3. Haz commit y push.
4. Abre un Pull Request describiendo los cambios.

---

## ⚖️ Licencia

Si quieres añadir una licencia, `MIT` es una buena opción para proyectos pequeños. Añade un archivo `LICENSE` con contenido MIT o el tipo que prefieras.

---

## 📫 Contacto

Si tienes dudas o sugerencias, abre un issue en el repositorio.

¡Disfruta del estilo cyberpunk y de una página de gestión sencilla de tareas!
