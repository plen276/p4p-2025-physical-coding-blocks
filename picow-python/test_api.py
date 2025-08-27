from api_client import connect_wifi, send_passthrough_request
from utime import sleep

def test_simple_message():
    """Send a simple test message to the server console"""
    print("=== Testing Simple API Message ===")
    
    # Connect to WiFi
    if not connect_wifi():
        print("Failed to connect to WiFi")
        return
    
    # Send a simple test command
    test_commands = ["TEST", "HELLO"]
    print(f"Sending test commands: {test_commands}")
    
    success = send_passthrough_request(test_commands)
    
    if success:
        print("✅ Test message sent successfully!")
        print("Check your server console for the message!")
    else:
        print("❌ Test message failed!")

def test_robot_commands():
    """Send robot movement commands to the server console"""
    print("\n=== Testing Robot Commands ===")
    
    # Robot movement commands
    robot_commands = ["F", "L", "R", "B", "U", "D"]
    
    for cmd in robot_commands:
        print(f"Sending command: {cmd}")
        send_passthrough_request([cmd])
        sleep(1)  # Wait 1 second between commands
    
    print("✅ All robot commands sent!")

if __name__ == "__main__":
    # Test simple message first
    test_simple_message()
    
    # Wait a bit
    sleep(3)
    
    # Test robot commands
    test_robot_commands()
    
    print("\n🎉 API testing complete!")


