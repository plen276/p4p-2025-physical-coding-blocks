import gc

from utime import sleep

import api  # noqa
import api_next  # noqa
import button
import commands
import led
from wifi import connect

if __name__ == "__main__":
    led.all_led_on()
    # Connect to Wi-Fi
    connect()
    while True:
        led.all_led_on()
        # Send MAC Address to server to register Pico
        api_next.send_mac_address()  # TODO: Uncomment if connecting to next.js server
        # Interpret current commands on Pico
        command_list = commands.process_commands()
        # Send live command feed
        api_next.live_request(command_list, len(command_list))
        # Send commands to queue if the button is pressed
        if button.BUTTON_PRESSED_FLAG:
            button.BUTTON_PRESSED_FLAG = False
            # TODO: Uncomment the respective line depending on which server to connect to
            # api.post_request(command_list, len(command_list))
            api_next.post_request(command_list, len(command_list))
            # ---------------------------------------------------------------------------

        led.all_led_off()
        sleep(1)
        gc.collect()
