#ifndef _DEFINES_H
#define _DEFINES_H

#define MASK_FROM_RANGE(low, high) (((1 << (high - low + 1)) - 1) << low) // Create a mask from a range of bits
#define GET_BIT(value, bit) ((value >> bit) & 1)                          // Get a bit from a value

#define STRINGIFY(x) #x
#define TOSTRING(x) STRINGIFY(x)

#define MAX_COMMANDS 1024

// Button pin
#define BUTTON_PIN 15

// Select output pins for multiplexers
#define NUM_SEL 3 // Number of select pins
#define SEL0 16
#define SEL1 17
#define SEL2 18
#define SEL_MASK MASK_FROM_RANGE(SEL0, SEL2) // Mask for all multiplexer select pins

// One multiplexer per row, two blocks per row
#define NUM_ROWS 4   // Number of rows/multiplexers
#define NUM_BLOCKS 2 // Number of blocks per row/multiplexer
#define NUM_INPUTS_PER_BLOCK 4
#define MUX1 0
#define MUX2 1
#define MUX3 2
#define MUX4 3
#define MUX_MASK MASK_FROM_RANGE(MUX1, MUX4) // Mask for all multiplexer result pins

#define MUX_INPUTS 8 // Number of inputs on each multiplexer

// WiFi connection
#define WIFI_SSID "robotics"
#define WIFI_PASSWORD "letmein1"

#define TLS_CLIENT_PORT 5000
#define API_TIMEOUT_SECS 15

#define PASSTHROUGH_SERVER "192.168.0.100"
#define PASSTHROUGH_PORT 5000
#define PASSTHROUGH_TARGET "/api/v1/passthrough/cyberpi"

#define HTTP_REQUEST "%s %s HTTP/1.1\r\n"                                \
                     "Host: %s:%d\r\n"                                   \
                     "Content-Type: application/json; charset=utf-8\r\n" \
                     "Content-Length: %d\r\n"                            \
                     "\r\n"                                              \
                     "%s"
#define HTTP_REQUEST_LEN 88 // Length of the HTTP request format string, excluding the format specifiers

#endif
