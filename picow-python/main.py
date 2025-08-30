from machine import Pin
from utime import sleep

from led import *

from wifi_connect import connect

pin = Pin("LED", Pin.OUT)

# print("LED starts flashing...")
# while True:
#     try:
#         pin.toggle()
#         sleep(1) # sleep 1sec
#     except KeyboardInterrupt:
#         break
# pin.off()
# print("Finished.")

if __name__ == "__main__":
    # print("In main")
    # while True:
    #     try:
    #         led_toggle()
    #         sleep(1)
    #         # connect()
    #     except KeyboardInterrupt:
    #         break
    # led_off()
    connect()
    