#stage 1
FROM node:16.13.1
WORKDIR /src/app
COPY . .
RUN npm install
RUN npm run build --prod

#stage 2
#FROM nginx:alpine
#COPY --from=node /app/dist/frontend /usr/share/nginx/html