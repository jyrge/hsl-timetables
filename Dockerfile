FROM node:9 as react-builder
WORKDIR /app
COPY . .
RUN yarn run build

FROM nginx:alpine
COPY — from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]
