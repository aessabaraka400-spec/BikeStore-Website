FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY src/html/ ./
COPY src/css/ ./css/
COPY src/js/ ./js/
COPY src/img/ ./img/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO /dev/null http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]