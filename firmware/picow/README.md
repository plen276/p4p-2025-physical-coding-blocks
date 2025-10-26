# PicoW Firmware

This directory contains firmware for the Raspberry Pi Pico W, which serves as the core of the Tangible User Interface (TUI). Two implementations are available: one in C and another in MicroPython.

## C Implementation (`c/`)

The `c/` directory contains a C-based implementation for the Pico.

> [!NOTE]
> This implementation was developed during the 2024 research round.
>
> While the CMake file has been updated to allow for compilation, the code may not execute as expected.
>
> For assistance with this version, please consult the 2024 research compendium, which includes the original source files and documentation.

## MicroPython Implementation (`python/`)

The `python/` directory contains a MicroPython implementation. This version is a translation of the original C code and includes several bug fixes and improvements. This is the currently the recommended and supported version.
