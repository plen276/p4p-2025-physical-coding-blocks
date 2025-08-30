import network
from utime import sleep
import urequests

WIFI_SSID = 'robotics'
WIFI_PASSWORD = 'letmein1'

SERVER_BASE_ADDRESSES = ['192.168.0.101']
URL_PREFIX = 'http://'
VERSION_URL_SUFFIX = ':5000/api/v1/version'
PASSTHROUGH_URL_SUFFIX = ':5001/api/v1/passthrough/cyberpi' 

def connect():
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(WIFI_SSID, WIFI_PASSWORD)
    
    print('Connecting to network...' + WIFI_SSID)
	
    while wlan.isconnected() == False:
        print('Waiting for connection...')
        sleep(1)
        
    print('Connection successful')
    print(wlan.ifconfig())
    
def send_message():
    # Use the same server for both requests (192.168.0.101)
    get_url = URL_PREFIX + SERVER_BASE_ADDRESSES[0] + VERSION_URL_SUFFIX
    post_url = URL_PREFIX + SERVER_BASE_ADDRESSES[0] + PASSTHROUGH_URL_SUFFIX
    data = {"message": "Hello from Raspberry Pi!"}
    
    print('=== Sending Hello Message ===')
    print('Hello from Raspberry Pi!')
    
    # First, test the version endpoint with GET
    print('\n--- Testing Version Endpoint ---')
    print('Sending GET request to', get_url)
    
    try:
        response = urequests.get(get_url)
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('✅ Version request successful!')
    except Exception as e:
        print('❌ Error sending version request:', e)
    
    # Then, test the passthrough endpoint with POST
    print('\n--- Testing Passthrough Endpoint ---')
    print('Sending POST request to', post_url)
    print('Data:', data)
    
    # Try different approaches to send the POST request
    print('\nTrying different POST request methods...')
    
    # Method 1: Try with headers
    try:
        print('Method 1: POST with explicit headers...')
        headers = {'Content-Type': 'application/json'}
        response = urequests.post(post_url, json=data, headers=headers)
        print('✅ Method 1 successful!')
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('🎉 Your "Hello from Raspberry Pi!" message was sent to the server console!')
        return  # Exit if successful
        
    except Exception as e:
        print('❌ Method 1 failed:', e)
    
    # Method 2: Try with data instead of json
    try:
        print('Method 2: POST with data parameter...')
        import json
        json_data = json.dumps(data)
        response = urequests.post(post_url, data=json_data)
        print('✅ Method 2 successful!')
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('🎉 Your "Hello from Raspberry Pi!" message was sent to the server console!')
        return  # Exit if successful
        
    except Exception as e:
        print('❌ Method 2 failed:', e)
    
    # Method 3: Try basic POST
    try:
        print('Method 3: Basic POST request...')
        response = urequests.post(post_url, json=data)
        print('✅ Method 3 successful!')
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('🎉 Your "Hello from Raspberry Pi!" message was sent to the server console!')
        
    except Exception as e:
        print('❌ Method 3 failed:', e)
    
    # Method 4: Try with simple string data
    try:
        print('Method 4: POST with simple string...')
        simple_data = "Hello from Raspberry Pi!"
        response = urequests.post(post_url, data=simple_data)
        print('✅ Method 4 successful!')
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('🎉 Your simple message was sent to the server console!')
        
    except Exception as e:
        print('❌ Method 4 failed:', e)
    
    # Method 5: Try with just a number
    try:
        print('Method 5: POST with simple number...')
        number_data = "42"
        response = urequests.post(post_url, data=number_data)
        print('✅ Method 5 successful!')
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('🎉 Your number was sent to the server console!')
        
    except Exception as e:
        print('❌ Method 5 failed:', e)
    
    # Method 6: Try with empty data
    try:
        print('Method 6: POST with empty data...')
        response = urequests.post(post_url, data="")
        print('✅ Method 6 successful!')
        print('Response status:', response.status_code)
        print('Response text:', response.text)
        response.close()
        print('🎉 Empty POST request was successful!')
        
    except Exception as e:
        print('❌ Method 6 failed:', e)
    
    print('\n🔍 All POST methods failed. This suggests:')
    print('   - The passthrough endpoint might not be running on port 5001')
    print('   - There might be a firewall/network issue')
    print('   - The endpoint might expect different data format')
    print('   - Check if your server is actually listening on 192.168.0.101:5001')
    print('   - The server might be expecting a different endpoint or protocol')
    
    print('\n=== Message Complete ===')
    
if __name__ == "__main__":
    connect()
    send_message()