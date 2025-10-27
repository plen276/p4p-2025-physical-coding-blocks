# Physical Coding Blocks

This project is a Tangible User Interface (TUI) system designed to teach programming concepts by allowing users to control a robot with physical blocks. The system consists of Pico-W-based devices that read physical blocks, a central web server that manages communication, and the robots itself.

> [!IMPORTANT]
> This project is configured to work with a router with the SSID `NaoBlocks` and a server running on `192.168.0.201`
>
> To change these settings, the firmware would need to be edited as detailed in the respective `README` files.

## System Architecture

The core of the system is a central web server that acts as a hub between the input devices (TUIs/picos) and the output devices (robots).

1. **TUIs**: Each TUI is managed by a Pico W microcontroller. The Pico reads the arrangement of the blocks, translates them into a sequence of commands, and sends them to the web server via Wi-Fi.
2. **Web Server**: A Next.js application that serves as the central communication hub. It registers Picos and robots, routes commands from a specific Pico to its assigned robot, and provides a web-based UI for monitoring and managing the entire system.
3. **Robots**: The robots connect to the server to poll for new commands sent from their assigned Pico device.

This decoupled architecture allows for flexible pairing of Picos and robots and real-time monitoring of the system's status.

## Project Components

This repository is organised into two main parts: `firmware` and `software`.

```bash
p4p-2025-physical-coding-blocks/
├── firmware/       # Firmware for the Pico W devices and robots
└── software/       # Next.js web server and management UI
```

### Software (Web Server)

The [`software/`](software/README.md) directory contains the Next.js web server. It's built with TypeScript and uses Prisma with SQLite for database management. It provides API endpoints for devices and a real-time web interface for system monitoring.

**Key Features:**

- Real-time device status monitoring
- Device assignment and management
- Command queue inspection
- Responsive UI with dark/light mode

For detailed instructions on how to set up and run the web server, see the [`software/README.md`](software/README.md).

### Firmware

The [`firmware/`](firmware/README.md) directory contains the code for both the TUI devices (Pico W) and the robots.

- The **TUI firmware** is responsible for reading the physical block configurations and sending the corresponding commands to the server.
- The **Robot firmware** is responsible for connecting to the server, polling for commands, and executing them.

For detailed instructions on building and flashing the firmware, see the relevant `README`s inside the [`firmware/`](firmware/README.md) directory.

## Getting Started

> [!TIP]
> To take full advantage of the configured workspace settings, modify the project using **one** of the following approaches:
>
> 1. Open the [`mono-workspace.code-workspace`](mono-workspace.code-workspace) file at the root of this repository, **or**
> 2. Open each directory in a seperate workspace, e.g.:
>       - `firmware/picow/python`
>       - `firmware/mBot2/`
>       - `software/`

To get the full system running, you will need to set up both the software and the firmware.

> [!NOTE]
> Ensure a router with the SSID `NaoBlocks` is set up and the server is assigned the static IP address `192.168.0.201` in the router's DHCP address reservation settings

1. **Clone the repository:**

    ```bash
    git clone https://github.com/plen276/p4p-2025-physical-coding-blocks.git
    cd p4p-2025-physical-coding-blocks
    ```

2. **Set up the Web Server:**
    - Navigate to the [`software/`](software/README.md) directory and follow the instructions in its `README.md` file.

3. **Set up the Firmware:**
    - Navigate to the [`firmware/`](firmware/README.md) directory and follow the instructions in its `README.md` file to build and upload the firmware to the devices.
