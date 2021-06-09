# 选择registry.ebrserver更小体积的基础nginx镜像
FROM registry.ebrserver/library/nginx:alpine
COPY ./dist /usr/share/nginx/html/model
RUN chmod 777 -R /usr/share/nginx/html/model
