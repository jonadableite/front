FROM node:20-alpine

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie arquivos de configuração
COPY package*.json ./
COPY .env.production .env

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Construa a aplicação
RUN npm run build

# Exponha a porta em que a aplicação Next.js será executada
EXPOSE 3000

# Inicie a aplicação
CMD ["npm", "start"]
