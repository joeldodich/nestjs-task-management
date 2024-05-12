FROM node:alpine as local
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY --from=local /usr/src/app/dist ./dist
CMD ["node", "dist/main"]


