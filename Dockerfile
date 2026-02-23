# Usamos un servidor web Nginx como base
FROM nginx:alpine
# Copiamos todos los archivos (HTML, CSS, JS) a la carpeta pública del servidor
COPY . /usr/share/nginx/html/
# Le decimos al contenedor que va a escuchar por el puerto 80
EXPOSE 80
