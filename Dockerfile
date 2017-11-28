FROM nginx
COPY /public/assets /usr/share/nginx/html
COPY server.js /usr/share/nginx/html/server.js
