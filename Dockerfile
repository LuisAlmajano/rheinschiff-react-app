# Reference:  https://www.youtube.com/watch?v=-ANCcFQBk6I

FROM node as build


WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19

COPY ./nginx/ngnix.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html