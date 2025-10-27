"""
Handles all API communication with the Next.js server.

This module is responsible for registering the Pico W device by sending its
MAC address and for sending command sequences to the server's 'commands'
and 'live' endpoints.
"""

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


def get_mac_address():
    """
    Retrieves the MAC address of the Pico W's WLAN interface.

    Returns:
        str: The MAC address in 'XX:XX:XX:XX:XX:XX' format.
    """
    wlan = network.WLAN(network.STA_IF)

    wlan.active(True)

    mac_bytes = wlan.config("mac")
    mac_address = ":".join("{:02X}".format(b) for b in mac_bytes)
    log("Device MAC Address:", mac_address)

    return mac_address


def send_mac_address():
    """
    Registers the device with the server by sending its MAC address.

    Returns:
        bool: True if the MAC address was sent and acknowledged successfully, False otherwise.
    """
    mac_address = get_mac_address()

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


def _send_post_request(url_suffix, commands, endpoint_name):
    """
    A helper function to send a POST request with commands to a specific endpoint.

    Args:
        url_suffix (str): The specific API endpoint suffix to append to the base URL.
        commands (list): A list of command strings to be sent.
        endpoint_name (str): A descriptive name for the endpoint for logging purposes.

    Returns:
        bool: True if the request was successful, False otherwise.
    """
    mac_address = get_mac_address()
    url = (
        NEXT_URL_PREFIX + NEXT_SERVER_BASE_ADDRESSES[0] + url_suffix
    )  # Build the full URL for the passthrough endpoint
    data = {
        "macAddress": mac_address,
        "commands": commands,
    }  # Prepare JSON payload with command data

    if not is_connected():
        connect()

    try:
        print(f"---- Sending {endpoint_name} Commands w POST ----")
        log(f"URL: {url}")
        log(f"Commands: {commands}")

        response = urequests.post(url, json=data, timeout=5)
        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")

        # Always close the response to free resources
        response.close()

        # Check if response was successful (200–299)
        if 200 <= response.status_code < 300:
            log(f"[PASS] {endpoint_name} commands sent successfully!")
            return True
        else:
            log(f"[FAIL] Server responded with an error for {endpoint_name} commands.")
            return False

    except Exception as e:
        log(f"[FAIL] Failed to send {endpoint_name} commands: {e}")
        return False


def post_request(commands):
    """
    Sends a sequence of commands to the main command execution endpoint.

    Blinks success or error LEDs based on the outcome.

    Args:
        commands (list): A list of command strings (e.g., ["A", "B", "D"]).

    Returns:
        bool: True if the request was successful, False otherwise.
    """
    success = _send_post_request(NEXT_COMMANDS_URL_SUFFIX, commands, "Robot")
    log_request_time()  # Log the time taken for the request for metrics
    if success:
        for _ in range(3):
            led.blink_success_led()
    else:
        for _ in range(3):
            led.blink_error_led()
    return success


def live_request(commands):
    """
    Sends a sequence of commands to the 'live' endpoint for real-time updates.

    Args:
        commands (list): A list of command strings (e.g., ["A", "B", "D"]).

    Returns:
        bool: True if the request was successful, False otherwise.
    """
    return _send_post_request(NEXT_LIVE_URL_SUFFIX, commands, "Live")


if __name__ == "__main__":
    send_mac_address()
