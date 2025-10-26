from time import sleep

from machine import Pin
from utime import sleep

from config import ERROR_LED_PIN, PICO_LED_PIN, SUCCESS_LED_PIN
from helper import log

pico_led = Pin(PICO_LED_PIN, Pin.OUT)
success_led = Pin(SUCCESS_LED_PIN, Pin.OUT)
error_led = Pin(ERROR_LED_PIN, Pin.OUT)


# PICO LED FUNCTIONS
def pico_led_toggle():
    """Toggle Pico LED state (on/off)"""
    log("Toggling Pico LED")
    pico_led.toggle()


def pico_led_on():
    """Turn Pico LED on"""
    log("Pico LED On")
    pico_led.on()


def pico_led_off():
    """Turn Pico LED off"""
    log("Pico LED Off")
    pico_led.off()


# SUCCESS LED FUNCTIONS
def success_led_toggle():
    """Toggle Success LED state (on/off)"""
    log("Toggling Success LED")
    success_led.toggle()


def success_led_on():
    """Turn Success LED on"""
    log("Success LED On")
    success_led.on()


def success_led_off():
    """Turn Success LED off"""
    log("Success LED Off")
    success_led.off()


def blink_success_led():
    "Blink success LED"
    log("Blink success LED")
    all_led_off()
    success_led_on()
    sleep(1)
    all_led_off()
    sleep(1)


# ERROR LED FUNCTIONS
def error_led_toggle():
    """Toggle Error LED state (on/off)"""
    log("Toggling Error LED")
    error_led.toggle()


def error_led_on():
    """Turn Error LED on"""
    log("Error LED On")
    error_led.on()


def error_led_off():
    """Turn Error LED off"""
    log("Error LED Off")
    error_led.off()


def blink_error_led():
    "Blink error LED"
    log("Blink error LED")
    all_led_off()
    error_led_on()
    sleep(1)
    all_led_off()
    sleep(1)


# ALL LED FUNCTIONS
def all_led_toggle():
    """Toggle all LEDs states (on/off)"""
    log("Toggling all LEDs")
    pico_led_toggle()
    success_led_toggle()
    error_led_toggle()


def all_led_on():
    """Turn all LEDs on"""
    log("All LEDs On")
    pico_led_on()
    success_led_on()
    error_led_on()


def all_led_off():
    """Turn all LEDs off"""
    log("All LEDs Off")
    pico_led_off()
    success_led_off()
    error_led_off()


def blink_all_led():
    "Blink all LEDs"
    log("Blink all LEDs")
    all_led_off()
    all_led_on()
    sleep(1)
    all_led_off()
    sleep(1)
