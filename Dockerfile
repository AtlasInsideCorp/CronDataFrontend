FROM node:14.16.1-alpine As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod --base-href

FROM nginx:1.19.5
WORKDIR /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx/virtual_host/* /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/dist/CronDataFrontend .

HEALTHCHECK --start-period=200s --interval=10s --timeout=15s \
  CMD curl -f http://panel:8080/api/ping || exit 1
EXPOSE 80
CMD ["/bin/sh",  "-c", "exec nginx -g 'daemon off;'"]

