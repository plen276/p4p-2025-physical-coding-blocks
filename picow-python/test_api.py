from utime import sleep

from api import get_request, post_request
from wifi import connect


def test_get_endpoint():
    """
    Test server connectivity using GET request to version endpoint.

    Sends HTTP GET request to the server"s version API endpoint
    to verify basic connectivity and server availability.

    Returns:
        bool: True if request successful, False otherwise
    """
    get_request()


def test_post_endpoint():
    """
    Test the passthrough endpoint by sending sample command data.

    Sends a predefined set of robot commands ["A", "C", "B", "D"] to the
    server's passthrough endpoint to verify the connection and data
    transmission is working correctly.

    The test data represents:
    - "A" = Move forward 1 step
    - "C" = Turn left
    - "B" = Move backward 1 step
    - "D" = Turn right

    Returns:
        None: Results are printed to console
    """
    data = ["A", "C", "B", "D"]
    data_count = len(data)

    post_request(data, data_count)


if __name__ == "__main__":

    print("=======================================")
    print("Starting API test script")
    print("---------------------------------------")
    # Connect to WiFi
    connect()
    print("---------------------------------------")
    # Test GET endpoint
    test_get_endpoint()
    sleep(5)
    print("---------------------------------------")
    # Test POST endpoint
    test_post_endpoint()
    sleep(5)
    print("---------------------------------------")
    print("Exiting test script.")
