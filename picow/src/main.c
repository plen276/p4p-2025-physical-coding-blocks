#include <stdio.h>

#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"

#include "api.h"
#include "button.h"
#include "defines.h"
#include "reader.h"
#include "wifi.h"

int main()
{
    stdio_init_all();
    // reader_init();
    // wifi_connect();
    // init_button();

    // char* result = wifi_connect();
    char* result;

    if (cyw43_arch_init()) {
        result = ("Wi-Fi init failed");
    }
    
    while (true) {
        
        cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 1);
        sleep_ms(250);
        
        cyw43_arch_enable_sta_mode();

        cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 0);
        sleep_ms(250);

        if (cyw43_arch_wifi_connect_timeout_ms(WIFI_SSID, WIFI_PASSWORD,
            CYW43_AUTH_WPA_TKIP_PSK, 30000)) {
            result = ("Wi-Fi connect failed");
            break;
        }
        result = ("Wi-Fi connected");
        break;
    }

    // Store result from each multiplexer, where each array element corresponds to a multiplexer
    // and each bit in the element corresponds to an input pin on the multiplexer
    // uint8_t results[NUM_ROWS][NUM_BLOCKS] = {{0}};
    // char commands[MAX_COMMANDS + 1] = ""; // 1 for null terminator
    const char *body = "{\"message\":\"Hi from Pico W\"}";

    while (true)
    {
        printf("%s\n", result);
        printf("Hello from Pico W\n");
        // api_request_text(PASSTHROUGH_SERVER, PASSTHROUGH_PORT, PASSTHROUGH_TARGET, "POST", body);

        uint body_len = strlen(body);
        uint request_len = HTTP_REQUEST_LEN + strlen("POST") + strlen(PASSTHROUGH_TARGET) + strlen(PASSTHROUGH_SERVER) + snprintf(NULL, 0, "%d", PASSTHROUGH_PORT) + snprintf(NULL, 0, "%d", body_len) + body_len;

        char request[request_len + 1]; // 1 for null terminator

        printf("Trying to send request\n");
        snprintf(request, sizeof(request), HTTP_REQUEST,
                "POST", PASSTHROUGH_TARGET, PASSTHROUGH_SERVER, PASSTHROUGH_PORT, body_len, body);

        bool success = tls_run_client(NULL, 0, PASSTHROUGH_SERVER, request, API_TIMEOUT_SECS);

        printf("Request sent\n");
        if (success)
            printf("[api_request] Request successful\n");
        else
            printf("[api_request] Request failed\n");

        // Flash onboard LED to indicate a send
        cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 1);
        sleep_ms(250);
        cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 0);
        sleep_ms(250);

        // if (!button_pressed)
        //     continue;

        // // Loop through each input pin on the multiplexers
        // reader_read(results);
        // reader_get_commands(results, commands);

        // // Print all rows
        // printf("==== Block Reading ====\n");
        // for (uint8_t row = 0; row < NUM_ROWS; row++)
        // {
        //     printf("Row %u: %u%u%u%u %u%u%u%u", row, GET_BIT(results[row][0], 0), GET_BIT(results[row][0], 1), GET_BIT(results[row][0], 2), GET_BIT(results[row][0], 3), GET_BIT(results[row][1], 0), GET_BIT(results[row][1], 1), GET_BIT(results[row][1], 2), GET_BIT(results[row][1], 3));
        //     printf("\n");
        // }

        // Send the results to the server
        // char *body = api_create_passthrough_body(commands);
        // api_request(PASSTHROUGH_SERVER, PASSTHROUGH_PORT, PASSTHROUGH_TARGET, "POST", body);
        // free(body);

        // Clear the button press
        // button_pressed = false;
    }

    wifi_disconnect();
}