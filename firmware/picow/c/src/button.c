#include "button.h"

#include <stdio.h>
#include "pico/stdlib.h"

#include "defines.h"

volatile bool button_pressed = false;

void button_callback(uint gpio, uint32_t events)
{
    if (!button_pressed)
    {
        printf("[button_callback] Button pressed\n");
        button_pressed = true;
    }
}

void init_button()
{
    gpio_init(BUTTON_PIN);
    gpio_set_dir(BUTTON_PIN, GPIO_IN);
    gpio_set_irq_enabled_with_callback(BUTTON_PIN, GPIO_IRQ_EDGE_FALL, true, &button_callback);
}