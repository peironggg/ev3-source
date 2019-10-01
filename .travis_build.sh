#!/bin/bash

sudo chmod +r /boot/vmlinuz-*
sudo chmod 0666 /dev/kvm
sudo update-guestfs-appliance

. ./build.sh
