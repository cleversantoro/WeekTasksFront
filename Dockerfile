# Usa a imagem do Node.js para construir o frontend
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos restantes
COPY . .

# Compila o frontend para produção
RUN npm run build

# Usa o servidor Nginx para servir os arquivos estáticos
FROM nginx:latest

# Copia os arquivos da build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# Comando para rodar o servidor
CMD ["nginx", "-g", "daemon off;"]
