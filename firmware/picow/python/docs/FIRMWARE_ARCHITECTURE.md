# Firmware Architecture

## Overview

The firmware is designed for the Raspberry Pi Pico W, which serves as the core of a Tangible User Interface (TUI). This system allows users to construct programs by arranging physical blocks. The firmware's role is to read the configuration of these blocks, translate them into a sequence of commands, and transmit them wirelessly to a central server for execution by a robot. The system is built using MicroPython in a simple, synchronous loop.

## System Architecture Diagram

```bash
[Raspberry Pi Pico W]
├── Main Application (`main.py`)
│   ├── System Initialisation
│   ├── Wi-Fi Connection
│   └── Main Execution Loop
│
├── Core Logic
│   ├── Command Processing (`commands.py`)
│   │   ├── Block Reading via Multiplexers
│   │   ├── Command Interpretation
│   │   └── Command List Generation
│   └── Server Communication
│       ├── `api_next.py` (Next.js Server)
│       │   ├── Register Pico
│       │   ├── Send Live Command Feed (HTTP POST)
│       │   └── Send Command Queue (HTTP POST)
│       └── `api_net.py` (Legacy .NET Server)
│           └── Send Command Queue (HTTP POST)
│
├── Hardware Drivers
│   ├── Wi-Fi (`wifi.py`)
│   ├── Button (`button.py`)
│   └── LED (`led.py`)
│
└── Configuration (`config.py`)
    ├── Wi-Fi Credentials
    ├── Server Addresses
    └── GPIO Pin Assignments
```

## Module Descriptions

### Main Application (`main.py`)

This is the main entry point of the firmware. It orchestrates the overall operation in a continuous loop.

- Initializes the system and hardware components.
- Connects the device to the Wi-Fi network.
- In a loop, it processes the tangible blocks, sends a live feed to the server (using `api_next.py`), and sends the final command queue when the user presses a button (can use either `api_net.py` or `api_next.py`).

### Core Logic

#### `commands.py`

This module contains the core logic for interpreting the physical blocks.

- It reads the state of the blocks by controlling multiplexers connected to the Pico's GPIO pins.
- It distinguishes between "primary" blocks (action type) and "secondary" blocks (magnitude).
- It processes the block readings to generate a list of command strings.
- It includes logic for special blocks like "REPEAT".

### Server Communication

The firmware supports communication with two different backend servers through two separate API modules.

#### `api_next.py` (for Next.js Server)

This module handles communication with the modern Next.js backend. This is the primary API module and supports the full range of features.

- **`send_mac_address()`**: Registers the Pico W with the server by sending its unique MAC address. This allows the server to identify and manage the device.
- **`live_request()`**: Sends the current list of commands to the server in real-time. This enables a "live feed" feature in the user interface.
- **`post_request()`**: Sends the final command sequence to the server's execution queue.

#### `api_net.py` (for legacy .NET Server)

This module handles communication with the legacy .NET backend. It has limited functionality compared to `api_next.py`.

- **`post_request()`**: Sends the final command sequence to the server's execution queue. This is the only function supported by the legacy server. It does not support device registration or a live command feed.

### Hardware Drivers

These are low-level modules that interact directly with the hardware components.

- **`wifi.py`**: Manages the Wi-Fi connection, including scanning for the network, connecting with credentials from `config.py`, and handling retries.
- **`button.py`**: Manages the state of the physical button, including simple debouncing by setting a flag.
- **`led.py`**: Provides functions to control the onboard and external LEDs to provide visual feedback to the user.

### Configuration (`config.py`)

A central file for defining all settings and constant values used throughout the firmware.

- Contains Wi-Fi credentials (`WIFI_SSID`, `WIFI_PASSWORD`).
- Defines server endpoint URLs and IP addresses for both the Next.js and legacy servers.
- Specifies the GPIO pin numbers used for the button, LEDs, and multiplexer select/output lines.
- `LEGACY`: A boolean flag to switch between the modern Next.js server (`False`) and the legacy .NET server (`True`). This is used in the `main.py` to determine which API module to use.

## Data Flow

This describes how data moves through the system:

1. **Sensing**: The `commands.py` module continuously reads the state of the grid of physical blocks by iterating through multiplexer channels.
2. **Processing**: The raw digital readings from the multiplexers are interpreted. The firmware identifies "primary" and "secondary" blocks for each column in the grid.
3. **Command Generation**: The combination of primary and secondary blocks in each column is converted into a command string (e.g., "A", "DD"). This process is repeated for all columns to generate a full list of commands.
4. **Live Transmission (Next.js only)**: If using the Next.js server, the generated list of commands is sent to the server via an HTTP POST request by `api_next.py` in each loop iteration to provide a live view of the user's program.
5. **Queue Transmission**: When the user presses the physical button, the `main.py` loop detects the button press flag. It then calls the `post_request` function in either `api_net.py` or `api_next.py` (depending on which is enabled in `main.py`) to send the current command list to the server's execution queue via an HTTP POST request.

## Communication Protocols

- **Wi-Fi**: The firmware connects to a standard Wi-Fi network.
- **HTTP**: All communication with the server is done via HTTP POST requests. The data (command lists, MAC address) is typically sent in the body of the request, often as JSON.

## State Management & Concurrency

- The system operates on a simple, single-threaded, synchronous model.
- The main loop in `main.py` executes all tasks sequentially.
- State is managed through simple variables and flags (e.g., `button.BUTTON_PRESSED_FLAG`).
- There is no complex concurrency model like `asyncio` or multi-threading, which keeps the logic straightforward and easy to follow.
