from utime import sleep

from led import (
    all_led_off,
    all_led_on,
    all_led_toggle,
    error_led_off,
    error_led_on,
    error_led_toggle,
    pico_led_off,
    pico_led_on,
    pico_led_toggle,
    success_led_off,
    success_led_on,
    success_led_toggle,
)


def test_led():
    """
    Test all LED functions with visual feedback.

    Tests led_on(), led_off(), and led_toggle() functions
    with delays between each operation for visual verification.
    """
    print("=== LED Test Starting ===")

    # Test 1: Turn LED on
    print("1. Turning LED ON...")
    all_led_on()
    sleep(2)  # Keep LED on for 2 seconds

    # Test 2: Turn LED off
    print("2. Turning LED OFF...")
    all_led_off()
    sleep(2)  # Keep LED off for 2 seconds

    # Test 3: Toggle LED (should turn on)
    print("3. Toggling LED (should turn ON)...")
    all_led_toggle()
    sleep(2)  # Keep LED on for 2 seconds

    # Test 4: Toggle LED again (should turn off)
    print("4. Toggling LED again (should turn OFF)...")
    all_led_toggle()
    sleep(2)  # Keep LED off for 2 seconds

    # Test 5: Multiple toggles
    print("5. Multiple toggles (blinking)...")
    for i in range(6):  # 6 toggles = 3 complete on/off cycles
        print(f"   Toggle {i+1}")
        all_led_toggle()
        sleep(0.5)  # Fast blink

    # Test 6: Final state - turn on
    print("6. Final state - turning LED ON...")
    all_led_on()
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
    all_led_on()
    sleep(0.5)
    all_led_off()
    sleep(0.5)
    all_led_toggle()
    sleep(0.5)
    all_led_toggle()
    sleep(0.5)

    print("Rapid test complete!")


def test_led_pattern():
    """
    Test LED with a specific pattern.

    Creates a visual pattern: ON-OFF-ON-OFF-ON
    """
    print("=== LED Pattern Test ===")

    pattern = [all_led_on, all_led_off, all_led_on, all_led_off, all_led_on]

    for i, led_func in enumerate(pattern, 1):
        print(f"Step {i}: {led_func.__name__}")
        led_func()
        sleep(1)

    print("Pattern test complete!")


def test_pico_led():
    """
    Test the Pico onboard LED functions individually.
    """
    print("=== Pico LED Test ===")

    print("Turning Pico LED ON...")
    pico_led_on()
    sleep(1)

    print("Turning Pico LED OFF...")
    pico_led_off()
    sleep(1)

    print("Toggling Pico LED ON/OFF three times...")
    for i in range(3):
        print(f"Toggle {i+1}")
        pico_led_toggle()
        sleep(0.5)

    print("Pico LED test complete!\n")


def test_error_led():
    """
    Test the Error LED functions individually.
    """
    print("=== Error LED Test ===")

    print("Turning Error LED ON...")
    error_led_on()
    sleep(1)

    print("Turning Error LED OFF...")
    error_led_off()
    sleep(1)

    print("Toggling Error LED ON/OFF three times...")
    for i in range(3):
        print(f"Toggle {i+1}")
        error_led_toggle()
        sleep(0.5)

    print("Error LED test complete!\n")


def test_success_led():
    """
    Test the Success LED functions individually.
    """
    print("=== Success LED Test ===")

    print("Turning Success LED ON...")
    success_led_on()
    sleep(1)

    print("Turning Success LED OFF...")
    success_led_off()
    sleep(1)

    print("Toggling Success LED ON/OFF three times...")
    for i in range(3):
        print(f"Toggle {i+1}")
        success_led_toggle()
        sleep(0.5)

    print("Success LED test complete!\n")


def test_all_leds_sequence():
    """
    Sequentially test Pico, Error, and Success LEDs.
    """
    print("=== Sequential LED Test ===")

    print("1. Pico LED ON")
    pico_led_on()
    sleep(1)

    print("2. Error LED ON")
    error_led_on()
    sleep(1)

    print("3. Success LED ON")
    success_led_on()
    sleep(1)

    print("Turning all LEDs OFF...")
    all_led_off()
    sleep(1)

    print("Sequential LED test complete!\n")


# Run the main test if this file is executed directly
if __name__ == "__main__":
    test_led()  # all LEDs (combined)
    test_led_rapid()  # quick test
    test_led_pattern()  # pattern test
    test_pico_led()  # individual Pico LED test
    test_error_led()  # individual Error LED test
    test_success_led()  # individual Success LED test
    test_all_leds_sequence()  # combined sequence test
