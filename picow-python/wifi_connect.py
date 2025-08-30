import machine
import network
from utime import sleep
import urequests

from config import (
    WIFI_SSID, 
    WIFI_PASSWORD, 
    SERVER_BASE_ADDRESSES, 
    URL_PREFIX, 
    VERSION_URL_SUFFIX, 
    PASSTHROUGH_URL_SUFFIX
) 

def connect():
    """
    Connect to WiFi network using predefined credentials.
    
    Checks if already connected before attempting connection.
    Uses machine.idle() for power-efficient waiting.
    Displays connection info including MAC and IP addresses.
    """
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print("Connecting to network... " + WIFI_SSID)
        wlan.connect(WIFI_SSID, WIFI_PASSWORD)
        while not wlan.isconnected():
            print("Waiting for connection...")
            machine.idle()
        print("Connection successful")
    else:
        print("Already connected to network")
    
    print(wlan.ifconfig())
    print('MAC address:', wlan.config('mac'))
    print('IP address:', wlan.ipconfig('addr4'))

    # wlan.connect(WIFI_SSID, WIFI_PASSWORD)
    
    # print('Connecting to network...' + WIFI_SSID)
	
    # while wlan.isconnected() == False:
    #     print('Waiting for connection...')
    #     sleep(1)
        
    # print('Connection successful')
    # print(wlan.ifconfig())
    # print('MAC address:', wlan.config('mac'))
    # print('IP address:', wlan.ipconfig('addr4'))
    
def test_get_endpoint():
    """
    Test server connectivity using GET request to version endpoint.
    
    Sends HTTP GET request to the server's version API endpoint
    to verify basic connectivity and server availability.
    
    Returns:
        bool: True if request successful, False otherwise
    """
    get_url = URL_PREFIX + SERVER_BASE_ADDRESSES[0] + VERSION_URL_SUFFIX
    
    print('\n--- Testing Version Endpoint ---')
    print('Sending GET request to', get_url)
    
    try:
        response = urequests.get(get_url)
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('✅ Version request successful!')
        return True
    except Exception as e:
        print('❌ Error sending version request:', e)
        return False


def test_post_endpoint():
    """
    Test server data submission using multiple POST request methods.
    
    Attempts various POST request formats to the passthrough endpoint:
    - JSON with headers
    - JSON as string data
    - Basic JSON
    - Simple string data
    - Numeric data
    - Empty data
    
    Tries methods sequentially until one succeeds or all fail.
    
    Returns:
        bool: True if any POST method successful, False if all fail
    """
    post_url = URL_PREFIX + SERVER_BASE_ADDRESSES[0] + PASSTHROUGH_URL_SUFFIX
    data = {"message": "Hello from Raspberry Pi!"}
    
    print('\n--- Testing Passthrough Endpoint ---')
    print('Sending POST request to', post_url)
    print('Data:', data)
    print('\nTrying different POST request methods...')
    
    # Method 1: POST with explicit headers
    if _try_post_method(1, post_url, "POST with explicit headers", 
                       lambda: urequests.post(post_url, json=data, 
                                            headers={'Content-Type': 'application/json'})):
        return True
    
    # Method 2: POST with data parameter
    if _try_post_method(2, post_url, "POST with data parameter", 
                       lambda: _post_with_json_data(post_url, data)):
        return True
    
    # Method 3: Basic POST
    if _try_post_method(3, post_url, "Basic POST request", 
                       lambda: urequests.post(post_url, json=data)):
        return True
    
    # Method 4: POST with simple string
    if _try_post_method(4, post_url, "POST with simple string", 
                       lambda: urequests.post(post_url, data="Hello from Raspberry Pi!")):
        return True
    
    # Method 5: POST with simple number
    if _try_post_method(5, post_url, "POST with simple number", 
                       lambda: urequests.post(post_url, data="42")):
        return True
    
    # Method 6: POST with empty data
    if _try_post_method(6, post_url, "POST with empty data", 
                       lambda: urequests.post(post_url, data="")):
        return True
    
    print('\n🔍 All POST methods failed. This suggests:')
    print('   - The passthrough endpoint might not be running on port 5001')
    print('   - There might be a firewall/network issue')
    print('   - The endpoint might expect different data format')
    print('   - Check if your server is actually listening on 192.168.0.100:5001')
    print('   - The server might be expecting a different endpoint or protocol')
    
    return False


def _try_post_method(method_num, url, description, request_func):
    """Helper function to try a POST method and handle the response"""
    try:
        print(f'Method {method_num}: {description}...')
        response = request_func()
        print(f'✅ Method {method_num} successful!')
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('🎉 Your message was sent to the server console!')
        return True
    except Exception as e:
        print(f'❌ Method {method_num} failed:', e)
        return False


def _post_with_json_data(url, data):
    """Helper function to POST with JSON data as string"""
    import json
    json_data = json.dumps(data)
    return urequests.post(url, data=json_data)


def send_message():
    """Main function to send messages to the server"""
    print('=== Sending Hello Message ===')
    print('Hello from Raspberry Pi!')
    
    # Test version endpoint
    version_success = test_get_endpoint()
    
    # Test passthrough endpoint
    passthrough_success = test_post_endpoint()
    
    print('\n=== Message Complete ===')
    return version_success and passthrough_success
