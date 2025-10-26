<!-- markdownlint-disable MD033 -->

# Development Environment Setup

This document outlines the setup for the Tangible User Interface (TUI) firmware development environment, which is based on MicroPython for the Raspberry Pi Pico W.

## Core Requirements

- **Python 3.x:** Required for running helper scripts and by some development tools.
- **Git:** For version control.

## MicroPython Development on Raspberry Pi Pico W

There are two primary recommended IDEs for MicroPython development with the Pico W:

### 1. Visual Studio Code (VS Code) with MicroPico Extension

This is a well-tested setup, offering good project management and REPL integration.

**Installation & Setup:**

1. **Install Visual Studio Code:** Download and install from [code.visualstudio.com](https://code.visualstudio.com/).
2. **Install Python:** If not already installed, get Python from [python.org](https://python.org).
3. **Install Git:** If not already installed, get Git from [git-scm.com](https://git-scm.com/).
4. **Install MicroPico VS Code Extension:**
    - Open VS Code.
    - Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
    - Search for `paulober.pico-w-go` and install it.

### 2. Thonny IDE

Thonny is a beginner-friendly Python IDE with built-in support for MicroPython and the Raspberry Pi Pico.

**Installation & Setup:**

1. **Install Thonny IDE:** Download and install from [thonny.org](https://thonny.org/).
2. **Configure Interpreter:**
    - Open Thonny.
    - Go to `Run` > `Select interpreter...`.
    - Choose `MicroPython (Raspberry Pi Pico)` as the interpreter.
    - Thonny may prompt you to install or update the MicroPython firmware on your Pico if it's outdated or not present.

## Flashing MicroPython Firmware to Pico W

Before you can run MicroPython scripts, you need to flash the MicroPython firmware onto the Pico W:

1. **Download MicroPython UF2 file:** Get the latest stable firmware for the "Raspberry Pi Pico W" from the [MicroPython downloads page](https://micropython.org/download/RPI_PICO_W/).
2. **Enter BOOTSEL Mode:**
    - Disconnect your Pico W from USB.
    - Press and hold the `BOOTSEL` button on the Pico W.
    - While holding `BOOTSEL`, connect the Pico W to your computer via USB.
    - The Pico W should now appear as a mass storage device (like a USB drive) named `RPI-RP2`.
3. **Copy UF2 File:** Drag and drop the downloaded `.uf2` firmware file onto the `RPI-RP2` drive.
4. **Reboot:** The Pico W will automatically reboot after the file is copied. It is now running MicroPython.

## Running Your Project on Pico W

### Using VS Code with MicroPico

1. **Configure Project:**
    - Open the [`/python`](/firmware/picow/python/) directory in VS Code.
    - The MicroPico extension may ask you to configure the project. Set the project directory to `firmware/picow/python`.
    > [!NOTE]
    > If the [`/python`](/firmware/picow/python/) directory is opened as a workspace on VSCode, the project is already configured to work with MicroPython.
2. **Connect to Pico:**
    > [!WARNING]
    > The following instructions assume that no manual COM device is set.
    >
    > If a connection error occurs check to see if `micropico.manualComDevice` in [`settings.json`](/firmware/picow/python/.vscode/settings.json) is set. This value might not match with the COM port of the connected Pico.
    - Open the Command Palette (<kbd>⌃ Control</kbd> <kbd>⇧ Shift</kbd> <kbd>P</kbd> or <kbd>⌘ Command</kbd> <kbd>⇧ Shift</kbd> <kbd>P</kbd>).
    - Type `MicroPico: Connect` and select it. Choose your Pico's serial port.
    - The MicroPico terminal should open and show the MicroPython REPL prompt (`>>>`).
    > [!TIP]
    > To skip the above step, set the `micropico.manualComDevice` in [`settings.json`](/firmware/picow/python/.vscode/settings.json)
    >
    > This will automatically connect and open the Pico on the REPL terminal.
3. **Upload Project:**
    - In the Command Palette, type `MicroPico: Upload project to Pico` and select it. This will copy all files from your configured project directory (`firmware/picow/python/`) to the Pico W.
4. **Run `main.py`:**
    - To run the main script, simply reset the Pico (e.g., by power cycling or using `machine.reset()` in the REPL). The `main.py` script is designed to run on boot.
    - Additionally, for testing purposes, open the Command Palette, type `MicroPico: Run current file` with the [`main.py`](/firmware/picow/python/main.py) file in focus.
    > [!NOTE]
    > If `micropico.softResetAfterUpload` is set, it will run the code as soon as the project upload is done in step 3.

### Using Thonny

> [!CAUTION]
> The following information is from a previous project, and the accuracy was not validated since I did not use this approach.

1. **Open Files:** Open your project files from the `firmware/picow/python/` directory in Thonny.
2. **Save to Pico:**
    - For each file you want on the Pico, open it, then go to `File` > `Save copy...`.
    - Choose `Raspberry Pi Pico` as the destination.
    - Save the file with the same name in the root directory of the Pico's filesystem.
3. **Run `main.py`:**
    - Open `main.py` from the Pico (Thonny's file browser should show files on the computer and the Pico).
    - Click the "Run current script" button (green play icon) or press F5.

## Server-Side Setup

The Pico W firmware communicates with a backend server. The main server for this project is a Next.js application located in the [`software/`](/software/README.md) directory.

- **Purpose:** The server provides the main user interface, manages the command queue, and communicates with the robots.
- **Setup:** For instructions on how to set up and run the Next.js server, please refer to the `README.md` file in the [`software/`](/software/README.md) directory.

## Additional Resources

- [Raspberry Pi Pico W Datasheet](/docs/pico-w-datasheet.pdf)
- [Raspberry Pi Pico W Schematic](/docs/picow-schematic.pdf)
- [MicroPython Documentation](https://docs.micropython.org/)
- [MicroPico Extension README](https://github.com/paulober/MicroPico) (Provides more details on extension features)
