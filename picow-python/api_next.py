from time import sleep

import network
import urequests

import led
from config import (
    NEXT_COMMANDS_URL_SUFFIX,
    NEXT_LIVE_URL_SUFFIX,
    NEXT_REGISTER_URL_SUFFIX,
    NEXT_SERVER_BASE_ADDRESSES,
    NEXT_URL_PREFIX,
)
from helper import log, log_request_time
from wifi import connect, is_connected


def get_mac_addresss():
    wlan = network.WLAN(network.STA_IF)

    wlan.active(True)

    mac_bytes = wlan.config("mac")
    mac_address = ":".join("{:02X}".format(b) for b in mac_bytes)
    log("Device MAC Address:", mac_address)

    return mac_address


def send_mac_address():
    mac_address = get_mac_addresss()

    url = NEXT_URL_PREFIX + NEXT_SERVER_BASE_ADDRESSES[0] + NEXT_REGISTER_URL_SUFFIX
    data = {"macAddress": mac_address}

    if not is_connected():
        connect()

    try:
        print("---- Sending MAC Address w POST ----")
        log(f"URL: {url}")
        print(f"MAC Address: {mac_address}")

        response = urequests.post(url, json=data, timeout=5)
        print(f"Response status: {response.status_code}")
        log(f"Response text: {response.text}")

        response.close()

        # Check if response was successful (200–299)
        if 200 <= response.status_code < 300:
            log("[PASS] MAC address sent successfully!")
            return True
        else:
            log("[FAIL] Failed to send MAC address")
            return False
    except Exception as e:
        log(f"[FAIL] Failed to send MAC address: {e}")
        return False


def post_request(commands, count):
    """
    Send robot commands to the server via POST request.

    Sends the generated command sequence to the passthrough endpoint
    where it will be forwarded to the robot for execution.

    Args:
        commands (list): List of robot command strings (e.g., ["A", "B", "D"])
        count (int): Number of commands in the sequence

    Returns:
        bool: True if request successful, False if failed
    """
    mac_address = get_mac_addresss()
    # Build the full URL for the passthrough endpoint
    url = NEXT_URL_PREFIX + NEXT_SERVER_BASE_ADDRESSES[0] + NEXT_COMMANDS_URL_SUFFIX

    # Prepare JSON payload with command data
    data = {"macAddress": mac_address, "commands": commands}

    if not is_connected():
        connect()

    try:
        print("---- Sending Robot Commands w POST ----")
        log(f"URL: {url}")
        log(f"Commands: {commands}")
        log(f"Count: {count}")

        # Send POST request with JSON data
        response = urequests.post(url, json=data, timeout=5)
        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")

        # Always close the response to free resources
        response.close()

        # Check if response was successful (200–299)
        if 200 <= response.status_code < 300:
            log("[PASS] Commands sent successfully!")
            for _ in range(3):
                led.blink_success_led()
            return True
        else:
            log("[FAIL] Server responded with an error.")
            for _ in range(3):
                led.blink_error_led()
            return False

    except Exception as e:
        log(f"[FAIL] Failed to send commands: {e}")
        for _ in range(3):
            led.blink_error_led()
        return False
    finally:
        log_request_time()


def live_request(commands, count):
    """
    Send robot commands to the server via POST request.

    Sends the generated command sequence to the passthrough endpoint
    where it will be forwarded to the robot for execution.

    Args:
        commands (list): List of robot command strings (e.g., ["A", "B", "D"])
        count (int): Number of commands in the sequence

    Returns:
        bool: True if request successful, False if failed
    """
    mac_address = get_mac_addresss()
    # Build the full URL for the passthrough endpoint
    url = NEXT_URL_PREFIX + NEXT_SERVER_BASE_ADDRESSES[0] + NEXT_LIVE_URL_SUFFIX

    # Prepare JSON payload with command data
    data = {"macAddress": mac_address, "commands": commands}

    if not is_connected():
        connect()

    try:
        print("---- Sending Live Commands w POST ----")
        log(f"URL: {url}")
        log(f"Commands: {commands}")
        log(f"Count: {count}")

        # Send POST request with JSON data
        response = urequests.post(url, json=data, timeout=5)
        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")

        # Always close the response to free resources
        response.close()

        # Check if response was successful (200–299)
        if 200 <= response.status_code < 300:
            log("[PASS] Commands sent successfully!")
            return True
        else:
            log("[FAIL] Failed to send commands")
            return False

    except Exception as e:
        log(f"[FAIL] Failed to send commands: {e}")
        return False


if __name__ == "__main__":
    send_mac_address()
