# Usamos un servidor web Nginx como base
FROM nginx:alpine
# Copiamos todos los archivos (HTML, CSS, JS) a la carpeta pública del servidor
COPY . /usr/share/nginx/html/
RUN wget https://code.jquery.com/jquery-1.4.2.min.js -O /usr/share/nginx/html/jquery-1.4.2.js
# Le decimos al contenedor que va a escuchar por el puerto 80
EXPOSE 80
