import urequests
import network
import machine
import time

WIFI_SSID = "Lenaduwa - 2.4 GHz"
WIFI_PASSWORD = "lenaduwa1968"

SERVER_BASE_ADDRESSES = ["192.168.20.16"]
URL_PREFIX = "http://"
REGISTER_URL_SUFFIX = ":3000/api/pico/register"


def connect():

    wlan = network.WLAN(network.STA_IF)

    wlan.active(True)

    networks = wlan.scan()
    print("Available networks:")
    for net in networks:
        ssid = net[0].decode("utf-8")
        rssi = net[3]
        print(f"SSID: {ssid}, RSSI: {rssi} dBm")
        if ssid == WIFI_SSID:
            print(f"Found target SSID: {ssid} with RSSI: {rssi} dBm")

    if not wlan.isconnected():
        print("Connecting to network... " + WIFI_SSID)
        wlan.connect(WIFI_SSID, WIFI_PASSWORD)

        while not wlan.isconnected():
            print("Waiting for connection...")
            if wlan.isconnected():
                break
            machine.idle()

        print("Connection successful")
    else:
        print("Already connected to network")

    print_connection_info(wlan)


def print_connection_info(wlan: network.WLAN):
    """Print WiFi connection information"""
    print("--------- Connection  Details ---------")
    print(wlan.ifconfig())  # Shows (IP, subnet, gateway, DNS)
    print("MAC address:", wlan.config("mac"))
    print("IP address:", wlan.ipconfig("addr4"))
    print("---------------------------------------")


def is_connected():
    """Check if the device is connected to WiFi"""
    wlan = network.WLAN(network.STA_IF)
    return wlan.isconnected()


def send_mac_address():
    mac_bytes = network.WLAN(network.STA_IF).config("mac")
    mac_address = ":".join("{:02X}".format(b) for b in mac_bytes)
    print("Device MAC Address:", mac_address)

    url = URL_PREFIX + SERVER_BASE_ADDRESSES[0] + REGISTER_URL_SUFFIX
    data = {"address": mac_address}

    if not is_connected():
        connect()

    try:
        print("---- Sending MAC Address w POST ----")
        print(f"URL: {url}")
        print(f"MAC Address: {mac_address}")

        response = urequests.post(url, json=data)
        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")

        response.close()
        print("[PASS] MAC address sent successfully!")
        return True
    except Exception as e:
        print(f"[FAIL] Failed to send MAC address: {e}")
        return False


if __name__ == "__main__":
    connect()
    send_mac_address()
