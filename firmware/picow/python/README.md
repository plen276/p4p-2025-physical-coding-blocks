# PicoW MicroPython Firmware for Tangible User Interface

This directory contains the MicroPython firmware for the Raspberry Pi Pico W, which acts as the brain for the Tangible User Interface (TUI). This TUI allows users to create programs for a robot by arranging physical blocks.

## Features

- **Tangible Programming:** Build programs by arranging physical blocks.
- **Wi-Fi Connectivity:** Connects to a Wi-Fi network to communicate with a central server.
- **Command Processing:** Reads the arrangement of blocks and translates them into a sequence of commands.
- **Live Feed:** Sends a live feed of the current command sequence to the server.
- **Command Queueing:** Sends the final command sequence to the server to be executed by a robot.
- **LED Feedback:** Uses LEDs to provide status feedback (e.g., power, connection status).

## How it Works

The TUI consists of a two-column grid where users can place blocks. The firmware reads the state of this grid using multiplexers connected to the Pico W's GPIO pins.

- **Block Reading**: The commands script reads the state of the blocks. It distinguishes between `primary` blocks (which define the type of action, like `move forward` or `turn`) and `secondary` blocks (which define the magnitude, like `3 steps` or `90 degrees`).
- **Command Processing**: The readings are processed row by row. Each row represents a single command in the program. The combination of a primary and a secondary block in a row defines the command.
- **Command Conversion**: The raw block data is converted into a simple character-based command language (e.g., `A` for forward, `D` for turn right).
- **Repeat Logic**: A special `REPEAT` block can be used to repeat the preceding sequence of commands.
- **Server Communication**: The processed command list is sent to the server via an HTTP POST request when the user presses the button. A live feed of the commands is also sent periodically.

## Usage

- Arrange the physical blocks on the TUI grid to create a program.
- Power on the Pico W. The LEDs will indicate the connection status.
- Once connected to the server, the Pico W will continuously read the blocks.
- Press the button to send the command sequence to the server for execution by a robot.

## Getting Started

### 1. Hardware

The firmware is designed for a custom PCB that includes a Raspberry Pi Pico W, multiplexers for reading the blocks, a button, and status LEDs. For a detailed list of pin connections, see the [Pin Mapping Documentation](docs/PIN_MAPPING.md).

### 2. Environment Setup

Follow the Toolchain Setup Guide for detailed instructions on:

- Flashing the MicroPython firmware to the Pico W.
- Setting up VS Code with the recommended extensions.
- Uploading the project files to the device.

### 3. Configuration

Before running, you must configure the firmware by editing the `config.py` file:

- **`WIFI_SSID`** and **`WIFI_PASSWORD`**: Set these to your Wi-Fi network's credentials.
- **`NEXT_SERVER_BASE_ADDRESSES`**: Update the IP address to point to your Next.js server.

### 4. Running the Firmware

Once the files are uploaded and configured, the Pico W will automatically run `main.py` on boot.

- Arrange the physical blocks on the TUI grid to create a program.
- The Pico W will connect to the server and continuously send a live feed of the commands.
- Press the button to send the final command sequence to the server for execution by a robot.

## Documentation

For more detailed information, please refer to the documentation in the `docs/` directory:

- **Firmware Architecture**: An in-depth look at the code structure, modules, and data flow.
- **Toolchain Setup**: Instructions for setting up your development environment.
- **Testing and Debugging**: Guidance on how to test and debug the firmware.
- **Pin Mapping**: A complete list of GPIO pin assignments.
- **Future Work**: A list of planned improvements and features.
