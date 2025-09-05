import machine
import network
from utime import sleep

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

        # Wait for connection to establish
        while not wlan.isconnected():
            print("Waiting for connection...")
            machine.idle()  # Put CPU in low-power mode while waiting

        print("Connection successful")
    else:
        print("Already connected to network")

    # Display network configuration information
    print_connection_info(wlan)


def print_connection_info(wlan: network.WLAN):
    """Print WiFi connection information"""
    print("--------- Connection  Details ---------")
    print(wlan.ifconfig())  # Shows (IP, subnet, gateway, DNS)
    print("MAC address:", wlan.config("mac"))
    print("IP address:", wlan.ipconfig("addr4"))
    print("---------------------------------------")
