from utime import sleep, sleep_us

from led import led_toggle, led_off
import button
from commands import read_commands, read_muxes, process_commands
from wifi import connect

if __name__ == "__main__":
    connect()
    while True:
        led_off()
        process_commands()
        sleep(2)
        led_toggle()
