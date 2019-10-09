#!/bin/bash

sudo chmod +r /boot/vmlinuz-*

bash ./build.sh
bash ./build-updater.sh
