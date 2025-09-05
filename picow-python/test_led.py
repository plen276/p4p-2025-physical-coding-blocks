from utime import sleep

from led import led_toggle, led_on, led_off

def test_led():
    """
    Test all LED functions with visual feedback.
    
    Tests led_on(), led_off(), and led_toggle() functions
    with delays between each operation for visual verification.
    """
    print("=== LED Test Starting ===")
    
    # Test 1: Turn LED on
    print("1. Turning LED ON...")
    led_on()
    sleep(2)  # Keep LED on for 2 seconds
    
    # Test 2: Turn LED off
    print("2. Turning LED OFF...")
    led_off()
    sleep(2)  # Keep LED off for 2 seconds
    
    # Test 3: Toggle LED (should turn on)
    print("3. Toggling LED (should turn ON)...")
    led_toggle()
    sleep(2)  # Keep LED on for 2 seconds
    
    # Test 4: Toggle LED again (should turn off)
    print("4. Toggling LED again (should turn OFF)...")
    led_toggle()
    sleep(2)  # Keep LED off for 2 seconds
    
    # Test 5: Multiple toggles
    print("5. Multiple toggles (blinking)...")
    for i in range(6):  # 6 toggles = 3 complete on/off cycles
        print(f"   Toggle {i+1}")
        led_toggle()
        sleep(0.5)  # Fast blink
    
    # Test 6: Final state - turn on
    print("6. Final state - turning LED ON...")
    led_on()
    sleep(1)
    
    print("=== LED Test Complete ===")
    print("LED should now be ON")

def test_led_rapid():
    """
    Rapid LED test for quick verification.
    
    Quickly cycles through LED states for fast testing.
    """
    print("=== Rapid LED Test ===")
    
    print("ON -> OFF -> TOGGLE -> TOGGLE")
    led_on()
    sleep(0.5)
    led_off()
    sleep(0.5)
    led_toggle()
    sleep(0.5)
    led_toggle()
    sleep(0.5)
    
    print("Rapid test complete!")

def test_led_pattern():
    """
    Test LED with a specific pattern.
    
    Creates a visual pattern: ON-OFF-ON-OFF-ON
    """
    print("=== LED Pattern Test ===")
    
    pattern = [led_on, led_off, led_on, led_off, led_on]
    
    for i, led_func in enumerate(pattern, 1):
        print(f"Step {i}: {led_func.__name__}")
        led_func()
        sleep(1)
    
    print("Pattern test complete!")

# Run the main test if this file is executed directly
if __name__ == "__main__":
    test_led()