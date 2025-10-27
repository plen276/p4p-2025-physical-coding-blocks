#include <stdint.h>

#include "defines.h"

/**
 * Initialise the reader pins.
 */
void reader_init(void);

/**
 * Get a list of commands from the results array.
 *
 * @param results The array of results from the reader.
 * @param commands The string to store the commands in.
 */
void reader_get_commands(uint8_t results[NUM_ROWS][NUM_BLOCKS], char *commands);

/**
 * Cycle through each input on the multiplexers and store the results in the
 * results array.
 *
 * @param results The array to store the results in. Each item in the array
 * corresponds to a multiplexer, and each bit in the item corresponds to an
 * input pin on the multiplexer.
 */
void reader_read(uint8_t results[NUM_ROWS][NUM_BLOCKS]);