#!/bin/bash

## 脚本调用方法 ./build-tag.sh tag号
## eg: ./build-tag.sh v1.2.8

## 每次构建新版本之前创建新标签、版本号、推送标签到gitlab

## 2.创建新版本
## 3.打tag
## 4.推送tag


#切换到本地develop分支
git checkout  develop

#拉取最新代码
git pull origin develop

#判断传入的版本是否已经存在
IS_EXIST=$(git tag | grep $1 -c | tr -d "\n")

#版本号，截取字符v
NEW_VERSION_NUMBER=${1#v}


if [[ $IS_EXIST = 1 ]];then

     echo 标签已存在,准备删除已有标签

     #删除本地tag
     git tag -d "$1"

     #删除远程tag
     git push origin :refs/tags/"$1"

     #重新创建tag
     git tag -a "$1" -m "$1"

     yarn version --new-version  "$NEW_VERSION_NUMBER"

     #推送tag
     git push origin "$1" && git push origin develop

else

     echo 标签不存在,准备创建新版本

     #yarn 构建新版本会自动创建一个tag讲package.json中version更新

     yarn version --new-version  "$NEW_VERSION_NUMBER"

     #推送tag和新的package.json到远程
     git push origin "$1" && git push origin develop

fi






