import network
import socket
import ssl
import json
from utime import sleep

# Configuration from defines.h
WIFI_SSID = "robotics"
WIFI_PASSWORD = "letmein1"
PASSTHROUGH_SERVER = "192.168.0.100"
PASSTHROUGH_PORT = 5001
PASSTHROUGH_TARGET = "/api/v1/passthrough/cyberpi"
API_TIMEOUT_SECS = 15

def connect_wifi():
    """Connect to WiFi network"""
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    
    if wlan.isconnected():
        print("Already connected to WiFi")
        return True
    
    print(f"Connecting to {WIFI_SSID}...")
    wlan.connect(WIFI_SSID, WIFI_PASSWORD)
    
    # Wait for connection
    max_wait = 10
    while max_wait > 0:
        if wlan.isconnected():
            break
        max_wait -= 1
        print("Waiting for connection...")
        sleep(1)
    
    if wlan.isconnected():
        print("WiFi connected successfully!")
        print(f"IP: {wlan.ifconfig()[0]}")
        return True
    else:
        print("WiFi connection failed")
        return False

def create_passthrough_body(commands):
    """Create JSON body for passthrough request (equivalent to api_create_passthrough_body)"""
    data = {
        "count": len(commands),
        "commands": list(commands)
    }
    return json.dumps(data)

def send_http_request(server, port, target, method, body):
    """Send HTTP request to server (equivalent to api_request)"""
    try:
        # Create socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(API_TIMEOUT_SECS)
        
        # Connect to server
        print(f"Connecting to {server}:{port}...")
        sock.connect((server, port))
        
        # Create HTTP request (equivalent to HTTP_REQUEST template)
        http_request = f"{method} {target} HTTP/1.1\r\n"
        http_request += f"Host: {server}:{port}\r\n"
        http_request += "Content-Type: application/json; charset=utf-8\r\n"
        http_request += f"Content-Length: {len(body)}\r\n"
        http_request += "\r\n"
        http_request += body
        
        print(f"Sending {method} request to {target}")
        print(f"Body: {body}")
        
        # Send request
        sock.send(http_request.encode())
        
        # Receive response
        response = sock.recv(1024).decode()
        print(f"Server response: {response}")
        
        sock.close()
        return True
        
    except Exception as e:
        print(f"Request failed: {e}")
        return False

def send_passthrough_request(commands):
    """Send passthrough request to server console"""
    # Create the JSON body
    body = create_passthrough_body(commands)
    
    # Send the request
    success = send_http_request(
        PASSTHROUGH_SERVER,
        PASSTHROUGH_PORT,
        PASSTHROUGH_TARGET,
        "POST",
        body
    )
    
    if success:
        print("Passthrough request sent successfully!")
    else:
        print("Passthrough request failed!")
    
    return success

def main():
    """Main function to demonstrate API usage"""
    print("=== PicoW API Client ===")
    
    # Connect to WiFi
    if not connect_wifi():
        return
    
    # Example: Send some commands to the server console
    commands = ["F", "L", "R", "B"]  # Forward, Left, Right, Back
    
    print(f"\nSending commands: {commands}")
    send_passthrough_request(commands)
    
    # Wait a bit and send another request
    sleep(2)
    
    commands2 = ["U", "D"]  # Up, Down
    print(f"\nSending more commands: {commands2}")
    send_passthrough_request(commands2)

if __name__ == "__main__":
    main()


