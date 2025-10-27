# Future Work

My list of to-dos for the future:

- [ ] Write a test file for [`api_next.py`](/firmware/picow/python/api_next.py) similar to the existing [`test_api_net.py`](/firmware/picow/python/test_api_net.py).
- [ ] Write a test file for [`wifi.py`](/firmware/picow/python/wifi.py)
- [ ] Improve Wi-Fi backoff logic
- [ ] Adding to this list...

The following is what AI thinks needs to be improved on:

This document outlines potential improvements and new features for the TUI firmware.

## Core Firmware & Robustness

- [ ] **Implement `asyncio`:** Convert the main synchronous loop in [`main.py`](/firmware/picow/python/main.py) to an asynchronous `asyncio` loop. This would improve responsiveness, especially for network operations, and allow for more complex concurrent tasks in the future.
- [ ] **Improve Wi-Fi Connection Logic:**
  - Implement a more robust backoff strategy for Wi-Fi connection attempts.
  - Consider adding a "captive portal" mode to allow users to configure Wi-Fi credentials without hardcoding them in [`config.py`](/firmware/picow/python/config.py).
- [ ] **Enhanced Error Handling:** Improve error handling in the API modules ([`api_net.py`](/firmware/picow/python/api_net.py), [`api_next.py`](/firmware/picow/python/api_next.py)) to gracefully handle server errors (e.g., 5xx status codes), network timeouts, and malformed responses.
- [ ] **Refactor API Modules:** Abstract the common HTTP request logic from [`api_net.py`](/firmware/picow/python/api_net.py) and [`api_next.py`](/firmware/picow/python/api_next.py) into a shared helper module to reduce code duplication.
- [ ] **Configuration Management:** Instead of hardcoding server IPs in [`config.py`](/firmware/picow/python/config.py), consider a discovery mechanism (e.g., UDP broadcast) or loading configuration from a separate `config.json` file.

## Features

- [ ] **Over-the-Air (OTA) Updates:** Implement a mechanism to update the firmware on the Pico W remotely. This would make it much easier to deploy updates and new features.
- [ ] **Expand Command Set:** Enhance the [`commands.py`](/firmware/picow/python/commands.py) module to support more advanced programming concepts, such as:
  - Loops with variable iterations.
  - Conditional statements (if/else).
  - Functions or subroutines.
- [ ] **Security:** Implement SSL/TLS for HTTPS communication with the server to secure the data in transit. The Pico W has hardware support for this.
- [ ] **Power Management:** If the device is battery-powered, implement power-saving features, such as putting the device into a deep sleep mode when not in use.

## Testing & Documentation

- [ ] **Create Test File for [`api_next.py`](/firmware/picow/python/api_next.py):** Write a dedicated test script (`test_api_next.py`) to verify the functionality of the Next.js server communication.
- [ ] **Expand Test Coverage:**
  - Create tests for the [`wifi.py`](/firmware/picow/python/wifi.py) module.
  - Add more comprehensive simulation test cases to [`test_commands.py`](/firmware/picow/python/test_commands.py) to cover all block combinations and edge cases.
