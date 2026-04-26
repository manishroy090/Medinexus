FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript
RUN npx tsc


EXPOSE 4000

CMD ["node", "build/index.js"]
