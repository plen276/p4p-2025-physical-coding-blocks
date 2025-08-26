# Getting started

First, install the recommended extensions.

You do not need to install the SDK manually, but you will need a few tools installed globally.

- cmake, e.g. with `brew install cmake`
- make, e.g. with `brew install make`
- and the cross-compiler, with `brew install --cask gcc-arm-embedded`, but see the [Troubleshooting](#troubleshooting) section below.

You can now do the initial preparation to create the build directory and makefiles. I'll assume you want to call your build directory `build`, but this is up to you.

```sh
mkdir build
cd build
cmake ..
```

At this point, you're ready to build files. (Note that you may have to revisit this step if you rename or add source files.)

## Compiling

From within the build directory, just run `make`.

### Troubleshooting

Note that the compiler can be particularly problematic. If you are using Brew, you must use `brew install --cask gcc-arm-embedded`. Note that if you used `brew install arm-none-eabi-gcc` you will run into a breaking issue:

```
$ make
[  1%] Building ASM object pico-sdk/src/rp2_common/boot_stage2/CMakeFiles/bs2_default.dir/compile_time_choice.S.obj
[  2%] Linking ASM executable bs2_default.elf
arm-none-eabi-gcc: fatal error: cannot read spec file 'nosys.specs': No such file or directory
compilation terminated.
```

If you get this error, you should uninstall the faulty compiler with `brew uninstall arm-none-eabi-gcc` and then run `brew autoremove` to get rid of its attached artifacts. You can now install the correct toolchain using `brew install --cask gcc-arm-embedded` as above.

## Uploading

Connect the Pico to your computer using USB. Ensure you hold down the mode button as you plug it in. It will present as a USB mass storage device, and you can program it by dragging and dropping the `embedded.uf2` over. It will immediately unmount and begin to execute your code (so you will need to unplug and reconnect to reprogram).

If you get sick of this, you can use `cp embedded.uf2 /Volumes/<name of pi>` on the command line (from within the build directory). You could chain this with `make && cp embedded.uf2 /Volumes/<name of pi>` to further streamline things.

## Serial connection over USB

macOS exposes devices as if they're files. This applies to the Pico, and it'll show up as both /dev/tty.usbmodem\* and /dev/cu.usbmodem\*, where "\*" is a unique numeric identifier.

You can use `ls` to work out what it's called.

```sh
ls /dev/tty.usbmodem*
```

For example, this might show `/dev/tty.usbmodem1201`.

If you have `minicom` installed, you can open a serial terminal connection.

```sh
minicom -b 115200 -o -D /dev/tty.usbmodem1201
```

You could also use the built-in `screen` command. You might want to [read this first](https://stackoverflow.com/a/431570) though, as some things are a little non-standard (for example,  <kbd>Ctrl</kbd>+<kbd>A</kbd> then <kbd>Ctrl</kbd>+<kbd>\\</kbd> to disconnect).

```sh
screen /dev/tty.usbmodem1201              # simplest usage

screen -S pico -R /dev/tty.usbmodem14701  # give the screen a name (pico) and reconnect if it already exists
screen -S pico -X quit                    # make it release the lock on the device
```

And because it behaves similarly to any other file, you can just as easily write to the Pico with `echo Hello, world! > /dev/tty.usbmodem1201`. You can read from it as per usual with `cat`, e.g. using `cat /dev/tty.usbmodem*`.

