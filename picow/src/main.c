#include <stdio.h>

#include "pico/stdlib.h"

#include "api.h"
#include "button.h"
#include "defines.h"
#include "reader.h"
#include "wifi.h"

int main()
{
    stdio_init_all();
    reader_init();
    wifi_connect();
    init_button();

    // Store result from each multiplexer, where each array element corresponds to a multiplexer
    // and each bit in the element corresponds to an input pin on the multiplexer
    uint8_t results[NUM_ROWS][NUM_BLOCKS] = {{0}};
    char commands[MAX_COMMANDS + 1] = ""; // 1 for null terminator

    while (1)
    {
        if (!button_pressed)
            continue;

        // Loop through each input pin on the multiplexers
        reader_read(results);
        reader_get_commands(results, commands);

        // Print all rows
        printf("==== Block Reading ====\n");
        for (uint8_t row = 0; row < NUM_ROWS; row++)
        {
            printf("Row %u: %u%u%u%u %u%u%u%u", row, GET_BIT(results[row][0], 0), GET_BIT(results[row][0], 1), GET_BIT(results[row][0], 2), GET_BIT(results[row][0], 3), GET_BIT(results[row][1], 0), GET_BIT(results[row][1], 1), GET_BIT(results[row][1], 2), GET_BIT(results[row][1], 3));
            printf("\n");
        }

        // Send the results to the server
        char *body = api_create_passthrough_body(commands);
        api_request(PASSTHROUGH_SERVER, PASSTHROUGH_PORT, PASSTHROUGH_TARGET, "POST", body);
        free(body);

        // Clear the button press
        button_pressed = false;
    }

    wifi_disconnect();
}