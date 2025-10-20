from machine import Pin
from utime import sleep, ticks_ms

# from api import post_request
import api  # noqa
import api_next  # noqa
import helper
from commands import process_commands
from config import BUTTON_PIN

button = Pin(BUTTON_PIN, Pin.IN, Pin.PULL_DOWN)
BUTTON_PRESSED_FLAG = False
"""
Configure GPIO pin `15` (`BUTTON_PIN` from `config.py` as input with internal pull-up resistor enabled\n
`Pin.IN` = Input mode (reads digital signals)\n
`Pin.PULL_DOWN` = Internal pull-up resistor (pulls pin `HIGH` when button pressed)
"""

DEBOUNCE_DELAY_MS = 1000  # Debounce delay in milliseconds
LAST_PRESS_TIME = 0  # Timestamp of the last button press


def button_pressed(pin):
    """Interrupt service routine called when the button is pressed."""
    global LAST_PRESS_TIME
    global BUTTON_PRESSED_FLAG
    time_now = ticks_ms()
    if time_now - LAST_PRESS_TIME > DEBOUNCE_DELAY_MS:
        print("Button interrupt: pressed")
        helper.REQUEST_START_TIME = time_now
        BUTTON_PRESSED_FLAG = True
        LAST_PRESS_TIME = time_now


def is_button_pressed():
    """
    Check if the button is currently pressed.

    With PULL_UP resistor:
    - Button NOT pressed = HIGH (1) - pulled up to 3.3V
    - Button pressed = LOW (0) - connected to ground

    Returns:
        bool: True if button is pressed, False otherwise
    """
    button_state = button.value()

    if button_state == 0:  # LOW = button pressed (with pull-up)
        print("Button is pressed")
        return True
    else:  # HIGH = button not pressed
        print("Button is not pressed")
        return False


# Interrupt to trigger on rising edge
button.irq(trigger=Pin.IRQ_RISING, handler=button_pressed)

if __name__ == "__main__":
    print("Starting button polling demo. Press the button to test.")
    try:
        while True:
            if is_button_pressed():
                print("Button detected as pressed in polling loop.")
            else:
                print("Button not pressed in polling loop.")
            sleep(1)  # Poll every second
    except KeyboardInterrupt:
        print("Exiting button polling demo.")
