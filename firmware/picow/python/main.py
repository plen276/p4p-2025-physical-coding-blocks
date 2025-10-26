import gc

from utime import sleep

import api_net  # noqa
import api_next  # noqa
import button
import commands
import led
from config import LEGACY
from wifi import connect

if __name__ == "__main__":
    led.all_led_on()
    # Connect to Wi-Fi
    connect()
    while True:
        led.all_led_on()

        # Send MAC Address to server to register Pico (Next.js only)
        if not LEGACY:
            api_next.send_mac_address()

        # Interpret current commands on Pico
        command_list = commands.process_commands()

        # Send live command feed (Next.js only)
        if not LEGACY:
            api_next.live_request(command_list, len(command_list))

        # Send commands to queue if the button is pressed
        if button.BUTTON_PRESSED_FLAG:
            button.BUTTON_PRESSED_FLAG = False
            if LEGACY:
                api_net.post_request(command_list, len(command_list))
            else:
                api_next.post_request(command_list, len(command_list))
            # ---------------------------------------------------------------------------

        led.all_led_off()
        sleep(1)
        gc.collect()
