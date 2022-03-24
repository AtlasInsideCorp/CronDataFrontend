FROM nginx:1.19.5
WORKDIR /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx/virtual_host/* /etc/nginx/conf.d/
COPY ./dist/CronDataFrontend/ /usr/share/nginx/html/

HEALTHCHECK --start-period=120s --interval=60s --timeout=60s \
  CMD curl --insecure -I -f https://localhost/health && curl --insecure -I -f https://localhost/api/ping || exit 1

EXPOSE 80
CMD ["/bin/sh",  "-c", "exec nginx -g 'daemon off;'"]
