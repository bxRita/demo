#!/bin/sh

##########################
## 脚本使用须知
## 1. 在hosts中添加
##    172.21.55.20 registry.ebrserver
## 2. 基础环境准备
##    - 安装docker
##    - /etc/docker/daemon.json 中 添加  "insecure-registries" : ["http://registry.ebrserver"]
##    - 重启docker  service docker restart
## 3. 登录docker registry
##    - docker login registry.ebrserver
##########################

set -e

VERSION=$(cat ./package.json | grep '"version"' | grep -Po '\d+\.\d+\.\d+')
if [ ! $VERSION ]; then
    echo 未找到新版本号
    exit 0
fi

echo 编译 V$VERSION ...
npm run build

echo docker 编译 ...
docker build --pull --rm -f "Dockerfile" -t registry.ebrserver/app/client/model:$VERSION "."
docker tag registry.ebrserver/app/client/model:$VERSION registry.ebrserver/app/client/model:latest

echo docker 上传 ...
docker push registry.ebrserver/app/client/model:$VERSION
docker push registry.ebrserver/app/client/model:latest

echo docker 删除本地镜像
docker image rm registry.ebrserver/app/client/model:$VERSION registry.ebrserver/app/client/model:latest
