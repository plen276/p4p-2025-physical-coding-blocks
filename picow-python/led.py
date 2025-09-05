from machine import Pin
from utime import sleep

from config import LED_PIN

led = Pin(LED_PIN, Pin.OUT)


def led_toggle():
    """Toggle LED state (on/off)"""
    print("Toggling LED")
    led.toggle()


def led_on():
    """Turn LED on"""
    print("LED On")
    led.on()


def led_off():
    """Turn LED off"""
    print("LED Off")
    led.off()


def blink():
    """Blink LED"""
    led_on()
    sleep(0.1)
    led_off()


def flash_on():
    """Flash LED on"""
    for _ in range(2):
        led_on()
        sleep(0.1)
        led_off()
    led_on()


def flash_off():
    """Flash LED off"""
    for _ in range(2):
        led_off()
        sleep(0.1)
        led_on()
    led_off()
