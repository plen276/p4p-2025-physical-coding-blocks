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
from wifi import connect, is_connected


def get_mac_addresss():
    wlan = network.WLAN(network.STA_IF)

    wlan.active(True)

    mac_bytes = wlan.config("mac")
    mac_address = ":".join("{:02X}".format(b) for b in mac_bytes)
    print("Device MAC Address:", mac_address)

    return mac_address


def send_mac_address():
    mac_address = get_mac_addresss()

    url = NEXT_URL_PREFIX + NEXT_SERVER_BASE_ADDRESSES[0] + NEXT_REGISTER_URL_SUFFIX
    data = {"macAddress": mac_address}

    if not is_connected():
        connect()

    try:
        print("---- Sending MAC Address w POST ----")
        print(f"URL: {url}")
        print(f"MAC Address: {mac_address}")

        response = urequests.post(url, json=data, timeout=5)
        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")

        response.close()

        # Check if response was successful (200–299)
        if 200 <= response.status_code < 300:
            print("[PASS] MAC address sent successfully!")
            return True
        else:
            print("[FAIL] Failed to send MAC address")
            return False
    except Exception as e:
        print(f"[FAIL] Failed to send MAC address: {e}")
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
        print(f"URL: {url}")
        print(f"Commands: {commands}")
        print(f"Count: {count}")

        # Send POST request with JSON data
        response = urequests.post(url, json=data, timeout=5)
        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")

        # Always close the response to free resources
        response.close()

        # Check if response was successful (200–299)
        if 200 <= response.status_code < 300:
            print("[PASS] Commands sent successfully!")
            led.all_led_off()
            led.success_led_on()
            sleep(1)
            led.all_led_off()
            sleep(1)
            led.success_led_on()
            sleep(1)
            led.all_led_off()
            sleep(1)
            led.success_led_on()
            sleep(1)
            return True
        else:
            print("[FAIL] Server responded with an error.")
            led.all_led_off()
            led.error_led_on()
            sleep(1)
            led.all_led_off()
            sleep(1)
            led.error_led_on()
            sleep(1)
            led.all_led_off()
            sleep(1)
            led.error_led_on()
            sleep(1)
            return False

    except Exception as e:
        print(f"[FAIL] Failed to send commands: {e}")
        led.all_led_off()
        led.error_led_on()
        sleep(1)
        led.all_led_off()
        sleep(1)
        led.error_led_on()
        sleep(1)
        led.all_led_off()
        sleep(1)
        led.error_led_on()
        sleep(1)
        return False


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
        print("---- Sending Robot Commands w POST ----")
        print(f"URL: {url}")
        print(f"Commands: {commands}")
        print(f"Count: {count}")

        # Send POST request with JSON data
        response = urequests.post(url, json=data, timeout=5)
        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")

        # Always close the response to free resources
        response.close()

        # Check if response was successful (200–299)
        if 200 <= response.status_code < 300:
            print("[PASS] Commands sent successfully!")
            return True
        else:
            print("[FAIL] Failed to send commands")
            return False

    except Exception as e:
        print(f"[FAIL] Failed to send commands: {e}")
        return False


if __name__ == "__main__":
    send_mac_address()
