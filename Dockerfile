FROM node:alpine3.24 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:alpine3.24
WORKDIR /app

COPY --from=builder /app/package*.json .
COPY --from=builder /app/dist ./dist

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/main.js"]
