FROM nginx:alpine

RUN mkdir -p /usr/share/nginx/html/home

COPY ./html /usr/share/nginx/html/home
COPY ./css /usr/share/nginx/html/css
COPY ./js /usr/share/nginx/html/js

# カスタム Nginx 設定をコピー
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
