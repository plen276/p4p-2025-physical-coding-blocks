from machine import Pin

from config import ERROR_LED_PIN, PICO_LED_PIN, SUCCESS_LED_PIN

pico_led = Pin(PICO_LED_PIN, Pin.OUT)
success_led = Pin(SUCCESS_LED_PIN, Pin.OUT)
error_led = Pin(ERROR_LED_PIN, Pin.OUT)


# PICO LED FUNCTIONS
def pico_led_toggle():
    """Toggle Pico LED state (on/off)"""
    print("Toggling Pico LED")
    pico_led.toggle()


def pico_led_on():
    """Turn Pico LED on"""
    print("Pico LED On")
    pico_led.on()


def pico_led_off():
    """Turn Pico LED off"""
    print("Pico LED Off")
    pico_led.off()


# SUCCESS LED FUNCTIONS
def success_led_toggle():
    """Toggle Success LED state (on/off)"""
    print("Toggling Success LED")
    success_led.toggle()


def success_led_on():
    """Turn Success LED on"""
    print("Success LED On")
    success_led.on()


def success_led_off():
    """Turn Success LED off"""
    print("Success LED Off")
    success_led.off()


# ERROR LED FUNCTIONS
def error_led_toggle():
    """Toggle Error LED state (on/off)"""
    print("Toggling Error LED")
    error_led.toggle()


def error_led_on():
    """Turn Error LED on"""
    print("Error LED On")
    error_led.on()


def error_led_off():
    """Turn Error LED off"""
    print("Error LED Off")
    error_led.off()


# ALL LED FUNCTIONS
def all_led_toggle():
    """Toggle all LEDs states (on/off)"""
    print("Toggling all LEDs")
    pico_led_toggle()
    success_led_toggle()
    error_led_toggle()


def all_led_on():
    """Turn all LEDs on"""
    print("All LEDs On")
    pico_led_on()
    success_led_on()
    error_led_on()


def all_led_off():
    """Turn all LEDs off"""
    print("All LEDs Off")
    pico_led_off()
    success_led_off()
    error_led_off()
