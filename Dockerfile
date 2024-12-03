# Etapa 1: Construcción
FROM node:20 as build

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente de la aplicación
COPY . .

# Compilar la aplicación Angular en modo producción
RUN npm run build -- --configuration production

# Etapa 2: Servidor de producción
FROM nginx:1.25

# Copiar la aplicación compilada desde la etapa de construcción
COPY --from=build /app/dist/mfe-carro /usr/share/nginx/html

# Copiar el archivo de configuración personalizado para Nginx si lo tienes
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
