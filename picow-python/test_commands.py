from utime import sleep

from commands import (
    PrimaryBlocks,
    SecondaryMove,
    SecondaryTurn,
    add_command_to_list,
    convert_to_command,
    process_commands,
)


def reading_commands():
    """Read commands from physical blocks and print them"""
    print("=========== Reading Command ===========")

    process_commands()


def simulate_commands():
    """Simulate command reading with fake data for testing"""
    print("=========== Simulation Mode ===========")

    # Simulated test data: list of [primary, secondary] pairs
    test_cases = [
        [
            [PrimaryBlocks.FORWARDS, SecondaryMove.TWO],
            [PrimaryBlocks.TURN, SecondaryTurn.TURN_90],
        ],
        [
            [PrimaryBlocks.BACKWARDS, SecondaryMove.THREE],
            [PrimaryBlocks.REPEAT, SecondaryMove.TWO],
        ],
        [
            [PrimaryBlocks.TURN, SecondaryTurn.TURN_180],
            [PrimaryBlocks.FORWARDS, SecondaryMove.ONE],
        ],
        [[PrimaryBlocks.REPEAT, SecondaryMove.FOUR]],
    ]

    for i, test_data in enumerate(test_cases):
        print(f"Test Case {i + 1}:")
        commands_array = []
        for block in test_data:
            commands = convert_to_command(block[0], block[1])
            commands = add_command_to_list(commands, block[1], commands_array)
            print(f"  Block: Primary={block[0]}, Secondary={block[1]}")
            print(f"  Simulated blocks: {test_data}")
            print(f"  Generated commands: '{commands}'")
        print(commands_array)


if __name__ == "__main__":
    # simulate_commands()
    while True:
        reading_commands()
        sleep(3)
