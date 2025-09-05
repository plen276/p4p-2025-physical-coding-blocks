import machine
import network
from utime import sleep, ticks_ms, ticks_diff

from config import (
    WIFI_SSID,
    WIFI_PASSWORD,
)


def connect():
    """
    Connect to WiFi network using predefined credentials.

    Checks if already connected before attempting connection.
    Uses machine.idle() for power-efficient waiting.
    Displays connection info including MAC and IP addresses.
    """
    # Create WiFi interface in station mode (client mode)
    wlan = network.WLAN(network.STA_IF)

    # Enable the WiFi interface
    wlan.active(True)

    # Only attempt connection if not already connected
    if not wlan.isconnected():
        print("Connecting to network... " + WIFI_SSID)
        wlan.connect(WIFI_SSID, WIFI_PASSWORD)

        attempt = 0
        wait_time = 1
        max_wait = 60

        # Wait for connection to establish
        start = ticks_ms()
        while not wlan.isconnected():
            print("Waiting for connection...")
            while ticks_diff(ticks_ms(), start) < wait_time * 1000:  # Check every 100ms
                if wlan.isconnected():
                    break
                machine.idle()  # Put CPU in low-power mode while waiting
                sleep(0.1)

            if wlan.isconnected():
                break

            attempt += 1
            print(f"Connection attempt {attempt} failed, retrying...")
            wlan.disconnect()
            sleep(0.5)
            wlan.connect(WIFI_SSID, WIFI_PASSWORD)

            # Exponential backoff with a maximum cap
            wait_time = min(wait_time * 2, max_wait)

        print("Connection successful")
    else:
        print("Already connected to network")

    # Display network configuration information
    print_connection_info(wlan)


def is_connected():
    """Check if the device is connected to WiFi"""
    wlan = network.WLAN(network.STA_IF)
    return wlan.isconnected()


def print_connection_info(wlan: network.WLAN):
    """Print WiFi connection information"""
    print("--------- Connection  Details ---------")
    print(wlan.ifconfig())  # Shows (IP, subnet, gateway, DNS)
    print("MAC address:", wlan.config("mac"))
    print("IP address:", wlan.ipconfig("addr4"))
    print("---------------------------------------")
