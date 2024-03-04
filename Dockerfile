FROM node:20-alpine as build

WORKDIR /app

COPY . /app

RUN yarn install \
    && yarn build

FROM nginx:alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# service nginx start
CMD ["nginx", "-g", "daemon off;"]
