FROM node:22-bookworm

WORKDIR /app

# Habilito corepack para yarn
RUN corepack enable

# Copio TODO el código primero (es indispensable para que aplique la carpeta patches/)
COPY . .

# Instalar dependencias aplicando los parches del proyecto
RUN yarn install --frozen-lockfile

# Exponer puertos: Frontend (3000) y Backend/API (3001)
EXPOSE 3000 3001

CMD ["yarn", "dev"]