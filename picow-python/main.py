from utime import sleep

import api_next  # noqa
import button  # noqa -- button module needs to be imported for the interrupt to run
import commands
import led
from wifi import connect

if __name__ == "__main__":
    connect()
    while True:
        led.led_off()
        api_next.send_mac_address()  # TODO: Uncomment if connecting to next.js server
        commands.process_commands()
        sleep(2)
        led.led_toggle()
