import urequests

from wifi import is_connected, connect
from config import (
    SERVER_BASE_ADDRESSES,
    URL_PREFIX,
    PASSTHROUGH_URL_SUFFIX,
    VERSION_URL_SUFFIX,
)


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
    # Build the full URL for the passthrough endpoint
    url = URL_PREFIX + SERVER_BASE_ADDRESSES[0] + PASSTHROUGH_URL_SUFFIX

    # Prepare JSON payload with command data
    data = {"commands": commands, "count": count}

    if not is_connected():
        connect()

    try:
        print("---- Sending Robot Commands w POST ----")
        print(f"URL: {url}")
        print(f"Commands: {commands}")
        print(f"Count: {count}")

        # Send POST request with JSON data
        response = urequests.post(url, json=data)
        print(f"Response status: {response.status_code}")
        print(f"Response text: {response.text}")

        # Always close the response to free resources
        response.close()
        print("[PASS] Commands sent successfully!")
        return True

    except Exception as e:
        print(f"[FAIL] Failed to send commands: {e}")
        return False


def get_request():
    """
    Test server connectivity using GET request to version endpoint.

    Sends HTTP GET request to the server"s version API endpoint
    to verify basic connectivity and server availability.

    Returns:
        bool: True if request successful, False otherwise
    """
    # Build the full URL for the version endpoint
    url = URL_PREFIX + SERVER_BASE_ADDRESSES[0] + VERSION_URL_SUFFIX

    if not is_connected():
        connect()

    try:
        print("Sending GET request to", url)

        response = urequests.get(url)
        print("Response status:", response.status_code)
        print("Response text:", response.text)
        response.close()
        print("[PASS] Get request successful!")
        return True
    except Exception as e:
        print(f"[FAIL] Error sending get request:", e)
        return False
