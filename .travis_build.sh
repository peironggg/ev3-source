#!/bin/bash

sudo chmod +r /boot/vmlinuz-*
sudo chmod 0666 /dev/kvm

. ./build.sh
