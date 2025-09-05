from machine import Pin

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
