<!-- markdownlint-disable MD033 -->

# mBot2 Firmware

This folder contains the firmware for the mBot2 robot, which allows it to receive and execute commands from the server. There are two versions of the firmware available:

1. **[`NET-server.py`](NET-server.py):** Connects to the legacy .NET-based server.
2. **[`nextjs-server.py`](nextjs-server.py):** Connects to the modern Next.js server.

Both versions run directly on the robot.

## Setup and Deployment

To run the firmware on an mBot2, you need to configure the network settings and upload the code using the mBlock software.

### 1. Configure Network Settings

Before uploading, you must edit the Python file (`NET-server.py` or `nextjs-server.py`) to match your network configuration.

```python
# Wifi settings
SERVER_BASE_ADDRESSES = ['192.168.0.201'] # Change to your server's IP address
WIFI_SSID = 'NaoBlocks'                   # Change to your Wi-Fi network name
WIFI_PASSWORD = 'letmein1'                # Change to your Wi-Fi password
```

### 2. Upload to mBot2

1. Download and install [mBlock](https://mblock.cc/pages/downloads).
2. Connect your computer to the mBot2 using a USB-C cable.
3. Power on the mBot2 and open the mBlock software.
4. In mBlock, connect to the mBot2 device.
5. Switch to the Python editor mode.
6. Copy the entire content of either `NET-server.py` or `nextjs-server.py` and paste it into the mBlock Python editor, replacing any existing code.
7. Click "Upload" to transfer the firmware to the robot. The robot will restart and begin execution.

## Command Execution Process

The firmware continuously polls the server for a stream of characters. Each character corresponds to a specific command which is executed in sequence.

## Command Mapping

The following codes are currently mapped:

- `A` -> Forward
- `B` -> Backward
- `C` -> Turn left
- `D` -> Turn right
- `E` -> Curve left
- `F` -> Curve right
- `G` -> Stop

## Additional Notes

- The network connection handling could be improved for better reliability.
- **Legacy vs. Modern Server:**
  - `NET-server.py`: Fetches commands from a general queue, as the legacy server did not support direct Pico-to-robot assignment. The robot is identified by its `NAME`.
  - `nextjs-server.py`: Registers itself with the server using its unique MAC address and polls for commands assigned specifically to it.
- **Execution Modes**: Both firmware versions include different action modes (e.g., `Discrete`, `Continuous`, `RandomValue`). These modes change how the robot interprets and executes movement commands and can be cycled through using the control buttons on the CyberPi.
- **mBlock Dependency**: The entire firmware must be in a single file, as mBlock does not support multi-file Python projects :wilted_flower:.

## FAQ

<details>

<summary>Do I have any idea how most of the code works?</summary>

- I didn't write most of this code and the API for the mBot is horribly documented so... goodluck :slightly_smiling_face:
- FYI, I put in the one piece of documentation I found for the mBot2 API into the [docs](/docs/mBot2_API_cyberpi.pdf) folder

</details>

<details>

<summary>The Python Editor on mBlock doesn't load main.py?</summary>

- On some days it just does not want to load :melting_face:. If this happens just use the default editor, it does work more or less the same way.

</details>
