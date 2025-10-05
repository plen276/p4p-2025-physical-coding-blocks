from machine import Pin
from utime import sleep, sleep_us

import config

# Pin Setup

# Select pins (output from Pico W to MUX)
sel0_pin = Pin(config.SEL0, Pin.OUT)
sel1_pin = Pin(config.SEL1, Pin.OUT)
sel2_pin = Pin(config.SEL2, Pin.OUT)

mux_outputs = [
    Pin(config.MUX1, Pin.IN),
    Pin(config.MUX2, Pin.IN),
    Pin(config.MUX3, Pin.IN),
    Pin(config.MUX4, Pin.IN),
]


# Block type enums
class PrimaryBlocks:
    FORWARDS = 0b0011  # 0b0011
    BACKWARDS = 0b0010  # 0b0001
    TURN = 0b1011  # 0b1011
    REPEAT = 0b1111  # 0b1111


class SecondaryMove:
    ONE = 0b0100  # 0b0010
    TWO = 0b1100  # 0b0011
    THREE = 0b1101  # 0b0111
    FOUR = 0b1111  # 0b1111


class SecondaryTurn:
    TURN_90 = 0b0100  # 0b0010
    TURN_180 = 0b1100  # 0b0011
    TURN_270 = 0b1001  # 0b0111


def read_commands():
    """Read all multiplexer channels and display primary/secondary blocks separately"""
    print("==== PRIMARY BLOCKS (Channels 0-3) ====")
    for channel in range(4):  # Channels 0-3 are primary blocks
        values = read_muxes(channel)
        print(f"Channel {channel}: {values}")

    print("\n")
    print("=== SECONDARY BLOCKS (Channels 4-7) ===")
    for channel in range(4, 8):  # Channels 4-7 are secondary blocks
        values = read_muxes(channel)
        print(f"Channel {channel}: {values}")

    print("=======================================")
    sleep(0.1)


# --- Functions ---


def select_channel(ch: int):
    """Set the select lines to choose channel 0–7"""
    sel0_pin.value((ch >> 0) & 1)
    sel1_pin.value((ch >> 1) & 1)
    sel2_pin.value((ch >> 2) & 1)


def read_muxes(ch: int):
    """Read all 4 muxes on the selected channel"""
    select_channel(ch)
    sleep_us(5)  # tiny settle time
    return [mux.value() for mux in mux_outputs]


def read_primary_blocks():
    """Read only the primary blocks (channels 0-3)"""
    print("=== PRIMARY BLOCKS (Action Type) ===")
    primary_data = []
    for channel in range(4):  # Channels 0-3
        values = read_muxes(channel)
        primary_data.append(values)
        print(f"Channel {channel}: {values}")
    return primary_data


def read_secondary_blocks():
    """Read only the secondary blocks (channels 4-7)"""
    print("=== SECONDARY BLOCKS (Magnitude/Quantity) ===")
    secondary_data = []
    for channel in range(4, 8):  # Channels 4-7
        values = read_muxes(channel)
        secondary_data.append(values)
        print(f"Channel {channel}: {values}")
    return secondary_data


def read_blocks_separated():
    """Read both primary and secondary blocks separately"""
    primary = read_primary_blocks()
    print()  # Add spacing
    secondary = read_secondary_blocks()
    return primary, secondary


# Main functions
def process_commands():
    """Process blocks and output commands one by one (column by column)"""
    print("==== PROCESSING COMMANDS ====")

    # Read all blocks
    primary, secondary = read_blocks_separated()

    commands = []

    # Process each column (each column = one command)
    for col in range(4):  # 4 multiplexer outputs = 4 columns
        print(f"\n--- Column {col} ---")

        # Get primary and secondary values for this column
        primary_val = 0
        secondary_val = 0

        # Build the 4-bit values from the readings
        for channel in range(4):  # Channels 0-3 for primary
            if channel < len(primary) and col < len(primary[channel]):
                primary_val |= primary[channel][col] << channel

        for channel in range(4, 8):  # Channels 4-7 for secondary
            if channel - 4 < len(secondary) and col < len(secondary[channel - 4]):
                secondary_val |= secondary[channel - 4][col] << (channel - 4)

        print(f"Primary: 0b{primary_val:04b} ({primary_val})")
        print(f"Secondary: 0b{secondary_val:04b} ({secondary_val})")

        # Convert to command
        command = convert_to_command(primary_val, secondary_val)

        # Handle command addition (including repeat logic)
        commands = add_command_to_list(command, secondary_val, commands)
        commands = [c for c in commands if c]
        print(f"Command: '{command}'")

    print(f"\nAll Commands: {commands}")
    print(f"Count: {len(commands)}")
    return commands


def add_command_to_list(command, secondary_val, commands):
    """
    Add a command to the commands list, handling repeat logic.

    Args:
        command: The command string to add
        secondary_val: Secondary block value for repeat count
        commands: The list of commands to modify
    """
    if command == "REPEAT":
        # Get the number of repeats from the secondary block value
        num_repeats = get_repeat_count(secondary_val)
        previous_commands = commands.copy()  # Copy current commands
        if previous_commands:
            # Repeat the previous commands the specified number of times
            for _ in range(num_repeats):
                commands.extend(previous_commands)
        # If no previous commands, do nothing (don't add empty string)
        return commands
    else:
        # Otherwise, add the command
        commands.append(command)
        return commands


def convert_to_command(primary, secondary):
    """Convert primary and secondary block values to a command string"""
    if primary == PrimaryBlocks.FORWARDS:
        if secondary == SecondaryMove.ONE:
            return "A"
        elif secondary == SecondaryMove.TWO:
            return "AA"
        elif secondary == SecondaryMove.THREE:
            return "AAA"
        elif secondary == SecondaryMove.FOUR:
            return "AAAA"

    elif primary == PrimaryBlocks.BACKWARDS:
        if secondary == SecondaryMove.ONE:
            return "B"
        elif secondary == SecondaryMove.TWO:
            return "BB"
        elif secondary == SecondaryMove.THREE:
            return "BBB"
        elif secondary == SecondaryMove.FOUR:
            return "BBBB"

    elif primary == PrimaryBlocks.TURN:
        if secondary == SecondaryTurn.TURN_90:
            return "D"
        elif secondary == SecondaryTurn.TURN_180:
            return "DD"
        elif secondary == SecondaryTurn.TURN_270:
            return "DDD"

    elif primary == PrimaryBlocks.REPEAT:
        return "REPEAT"

    return ""  # No command if blocks don"t match known patterns


def get_repeat_count(secondary_val):
    """Get how many times to repeat based on secondary block value"""
    if secondary_val == SecondaryMove.ONE:
        return 1
    elif secondary_val == SecondaryMove.TWO:
        return 2
    elif secondary_val == SecondaryMove.THREE:
        return 3
    elif secondary_val == SecondaryMove.FOUR:
        return 4
    return 0  # Default to 0 repeat if unknown
