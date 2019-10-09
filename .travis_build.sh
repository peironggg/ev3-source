#!/bin/bash

sudo chmod +r /boot/vmlinuz-*

rm -rf node_modules

bash ./build.sh
bash ./build-updater.sh
