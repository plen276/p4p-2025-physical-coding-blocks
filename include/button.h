#include "pico/stdlib.h"

extern volatile bool button_pressed;

/**
 * Initialise the button pins and interrupts.
 */
void init_button();