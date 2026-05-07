# Etapa 1: Build de la app React/Vite
FROM node:20-alpine AS build

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar resto del proyecto
COPY . .

# Build producción
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Copiar archivos compilados
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

# Ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]