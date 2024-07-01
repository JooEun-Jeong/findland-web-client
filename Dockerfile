FROM node:20-alpine as build

# for image optimization
RUN apk add --no-cache \
   autoconf \
   automake \
   bash \
   g++ \
   libc6-compat \
   libjpeg-turbo-dev \
   libpng-dev \
   make \
   nasm \
   optipng

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install \
    && yarn build

FROM nginx:alpine as production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

# service nginx start
CMD ["nginx", "-g", "daemon off;"]
