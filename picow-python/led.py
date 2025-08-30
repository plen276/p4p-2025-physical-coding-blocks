from machine import Pin

def led_toggle():
	pin = Pin("LED", Pin.OUT)
	pin.toggle()
 
def led_on():
	pin = Pin("LED", Pin.OUT)
	pin.on()
 
def led_off():
	pin = Pin("LED", Pin.OUT)
	pin.off()
