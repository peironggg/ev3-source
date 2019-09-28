# ev3dev image with Node + Source to ES5 transpiler

For CS1101S Robot missions.

We preinstall Node and a transpiler so students can simply use `source3 file.js` to execute a Source &sect;3 file.

## How to enter the image (on your PC)

Make sure you have Docker and static QEMU installed, and binfmt_misc configured to invoke QEMU for foreign architecture binaries.

After you have the dependencies installed, you can run `docker build -t ev3-source .`, then `docker run --rm -it ev3-source su -l robot`.

### Dependencies

If you're on Ubuntu:

- [Install Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository)
- [Install `qemu-static-user`](https://packages.ubuntu.com/disco/qemu-user-static) (you should be able to just `apt-get install qemu-user-static`)

If you're on Arch:

- Install Docker: `pacman -S docker`
- Install [`qemu-user-static-bin` from the AUR](https://aur.archlinux.org/packages/qemu-user-static-bin).

## How to build the bootable image

You need to have the dependencies from the previous section. Additionally, you need `libguestfs` and [Brickstrap](https://github.com/ev3dev/brickstrap) (you just need the [shell script](https://raw.githubusercontent.com/ev3dev/brickstrap/master/src/brickstrap.sh)).

Run:

- `brickstrap create-tar ev3-source ev3-source.tar`
- `brickstrap create-image ev3-source.tar ev3-source.img`

### Dependencies

If you're on Ubuntu:

- `apt-get install libguestfs-tools`

If you're on Arch:

- Install [`libguestfs` from the AUR](https://aur.archlinux.org/packages/libguestfs/).

## Why not just use a more recent Node?

V8's JIT dropped support for ARM CPUs that don't support VFP2, an optional instruction set extension for ARM, some time back in 2012-2013. Unfortunately, the microprocessor in the EV3 brick, a Texas Instruments AM1808 which uses an ARM926EJ-S core, does not include VFP2.

