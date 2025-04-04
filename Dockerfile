FROM node:20-alpine as builder
WORKDIR /app

# Copiar solo lo necesario para optimizar la cache de Docker
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Ejecutar el build
RUN npm run build && ls -la /app/dist

# Servir la aplicación con un servidor web ligero (por ejemplo, nginx)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar los archivos estáticos desde el build de React/Vite
COPY --from=builder /app/dist ./

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
