#include "reader.h"

#include <string.h>
#include "pico/stdlib.h"

enum PRIMARY_BLOCKS
{
    PRIMARY_BLOCKS_FORWARDS = 0b0011,
    PRIMARY_BLOCKS_BACKWARDS = 0b0001,
    PRIMARY_BLOCKS_TURN = 0b1011,
    PRIMARY_BLOCKS_REPEAT = 0b1111,
};

enum SECONDARY_MOVE
{
    SECONDARY_MOVE_ONE = 0b0010,
    SECONDARY_MOVE_TWO = 0b0011,
    SECONDARY_MOVE_THREE = 0b0111,
    SECONDARY_MOVE_FOUR = 0b1111,
};

enum SECONDARY_TURN
{
    SECONDARY_TURN_90 = 0b0010,
    SECONDARY_TURN_180 = 0b0011,
    SECONDARY_TURN_270 = 0b0111,
};

void reader_init(void)
{
    gpio_init_mask(MUX_MASK);
    gpio_init_mask(SEL_MASK);
    gpio_set_dir_out_masked(SEL_MASK);
}

void reader_get_commands(uint8_t results[NUM_ROWS][NUM_BLOCKS], char *commands)
{
    // Reset commands
    memset(commands, 0, sizeof(commands));

    for (uint8_t row = 0; row < NUM_ROWS; row++)
    {
        uint8_t primary = results[row][0];
        uint8_t secondary = results[row][1];

        switch (primary)
        {
        case PRIMARY_BLOCKS_FORWARDS:
            switch (secondary)
            {
            case SECONDARY_MOVE_ONE:
                strcat(commands, "A");
                break;
            case SECONDARY_MOVE_TWO:
                strcat(commands, "AA");
                break;
            case SECONDARY_MOVE_THREE:
                strcat(commands, "AAA");
                break;
            case SECONDARY_MOVE_FOUR:
                strcat(commands, "AAAA");
                break;
            }
            break;
        case PRIMARY_BLOCKS_BACKWARDS:
            switch (secondary)
            {
            case SECONDARY_MOVE_ONE:
                strcat(commands, "B");
                break;
            case SECONDARY_MOVE_TWO:
                strcat(commands, "BB");
                break;
            case SECONDARY_MOVE_THREE:
                strcat(commands, "BBB");
                break;
            case SECONDARY_MOVE_FOUR:
                strcat(commands, "BBBB");
                break;
            }
            break;
        case PRIMARY_BLOCKS_TURN:
            switch (secondary)
            {
            case SECONDARY_TURN_90:
                strcat(commands, "D");
                break;
            case SECONDARY_TURN_180:
                strcat(commands, "DD");
                break;
            case SECONDARY_TURN_270:
                strcat(commands, "DDD");
                break;
            }
            break;
        case PRIMARY_BLOCKS_REPEAT:
        default:
            switch (secondary)
            {
            case SECONDARY_MOVE_ONE:
                strcat(commands, commands);
                break;
            case SECONDARY_MOVE_TWO:
                strcat(commands, commands);
                strcat(commands, commands);
                break;
            case SECONDARY_MOVE_THREE:
                strcat(commands, commands);
                strcat(commands, commands);
                strcat(commands, commands);
                break;
            case SECONDARY_MOVE_FOUR:
                strcat(commands, commands);
                strcat(commands, commands);
                strcat(commands, commands);
                strcat(commands, commands);
                break;
            }
            break;
        }
    }
}

void reader_read(uint8_t results[NUM_ROWS][NUM_BLOCKS])
{
    // Reset results
    memset(results, 0, NUM_ROWS * NUM_BLOCKS * sizeof(uint8_t));

    // Loop through each input pin on the multiplexers
    for (uint8_t select = 0; select < MUX_INPUTS; select++)
    {
        // Select the new input pin every multiplexer should read
        gpio_put_masked(SEL_MASK, select << SEL0);
        sleep_us(10); // Wait at least 370 ns for the multiplexers to settle

        // Save all multiplexer results
        for (uint8_t row = 0; row < NUM_ROWS; row++)
        {
            uint8_t block = select / 4;
            uint8_t input = select % 4;
            results[row][block] |= gpio_get(MUX1 + row) << input;
        }
    }
}