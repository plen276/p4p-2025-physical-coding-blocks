from utime import sleep, sleep_us

from led import led_toggle, led_off
import button
from commands import read_commands, read_muxes, process_commands

from wifi import connect
# from reader import BlockReader
# from button import button_pressed, is_button_pressed, polling_demo

if __name__ == "__main__":
    iteration = 0
    # print("In main")

    connect()

    while True:
        iteration += 1
        print("=======================================\nIteration", iteration)
        # process_commands()
        # for ch in range(8):  # 8 inputs per mux
        #     values = read_muxes(ch)
        #     print(f"Channel {ch}: {values}")
        # print("----")
        # sleep_us(10)
        try:
            led_toggle()
            sleep(1)
        except KeyboardInterrupt:
            break
    led_off()
    # x = 0
    # while x < 5:
    #     led_toggle()
    #     sleep(1)
    #     x += 1

    # x = 0
    # led_on()

    # connect()

    # reader = BlockReader()
    # commands = reader.read_and_get_commands()
    # print(f"Commands: {commands}")

    # polling_demo()

    # try:
    #     response = urequests.post(
    #       "http://192.168.0.150:5000/api/v1/passthrough/cyberpi",
    #         json = {
    #           "commands": ["A", "C", "B", "D"],
    #           "count": 4
    #         }
    #     )

    #     print("Response status:", response.status_code)
    #     print("Response text:", response.text)
    #     response.close()
    # except Exception as e:
    #     print(f"Post failed:", e)

    # while True:
    #     if button_pin.value() == 1:
    #         print("Button is pressed!")
    #         sleep(0.5)
    #     else:
    #         print("Waiting for button press...")
    #         sleep(0.5)
    # while True:

    #     sleep(1)
