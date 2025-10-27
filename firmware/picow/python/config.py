"""
Central configuration file for the P4P Physical Coding Blocks project.

This file contains all the core settings for the Pico W firmware, including:
- WiFi credentials
- Server API endpoints (for both legacy and Next.js servers)
- Hardware pin assignments for components like LEDs, buttons, and multiplexers
- System-level constants and debug flags
"""

# WiFi Configuration
WIFI_SSID = "NaoBlocks"
WIFI_PASSWORD = "letmein1"

# Server Configuration
SERVER_BASE_ADDRESSES = ["192.168.0.150"]
URL_PREFIX = "http://"
VERSION_URL_SUFFIX = ":5000/api/v1/version"
PASSTHROUGH_URL_SUFFIX = ":5000/api/v1/passthrough/cyberpi"

# Next Server Configuration
NEXT_SERVER_BASE_ADDRESSES = ["192.168.0.201"]
NEXT_URL_PREFIX = "http://"
NEXT_REGISTER_URL_SUFFIX = ":3000/api/pico/register"
NEXT_COMMANDS_URL_SUFFIX = ":3000/api/pico/commands"
NEXT_LIVE_URL_SUFFIX = ":3000/api/pico/live"

# Connection Settings
CONNECTION_TIMEOUT = 10
RETRY_ATTEMPTS = 3

# Debug Settings
LEGACY = False
DEBUG_MODE = True
VERBOSE = True

# Component Pins
PICO_LED_PIN = "LED"
ERROR_LED_PIN = 2
SUCCESS_LED_PIN = 3
BUTTON_PIN = 15

# System constants
NUM_ROWS = 4
NUM_BLOCKS = 2

# Multiplexer constants
MUX_INPUTS = 8
MUX_SELS = 3

# Shared select pins
SEL0 = 16
SEL1 = 17
SEL2 = 18

# Multiplexer output pins
MUX1 = 11
MUX2 = 10
MUX3 = 9
MUX4 = 8

# Documentation strings
WIFI_SSID.__doc__ = "WiFi SSID for network connection"
WIFI_PASSWORD.__doc__ = "WiFi password for network connection"

SERVER_BASE_ADDRESSES.__doc__ = "List of possible legacy server base addresses"
URL_PREFIX.__doc__ = "URL prefix for legacy server communication"
VERSION_URL_SUFFIX.__doc__ = "API endpoint suffix for legacy version check"
PASSTHROUGH_URL_SUFFIX.__doc__ = "API endpoint suffix for legacy passthrough requests"

NEXT_SERVER_BASE_ADDRESSES.__doc__ = "List of possible Next.js server base addresses"
NEXT_URL_PREFIX.__doc__ = "URL prefix for Next.js server communication"
NEXT_REGISTER_URL_SUFFIX.__doc__ = (
    "API endpoint for Pico registration with the Next.js server"
)
NEXT_COMMANDS_URL_SUFFIX.__doc__ = (
    "API endpoint for sending commands to the Next.js server"
)
NEXT_LIVE_URL_SUFFIX.__doc__ = (
    "API endpoint for sending live command previews to the Next.js server"
)

CONNECTION_TIMEOUT.__doc__ = "Connection timeout in seconds"
RETRY_ATTEMPTS.__doc__ = "Number of retry attempts for connections"

LEGACY.__doc__ = "Flag to switch between legacy .NET server and Next.js server APIs"
DEBUG_MODE.__doc__ = "Enable or disable debug mode"
VERBOSE.__doc__ = "Enable or disable verbose logging"

PICO_LED_PIN.__doc__ = "Onboard LED pin for Pico W"
ERROR_LED_PIN.__doc__ = "GPIO pin for the error indicator LED"
SUCCESS_LED_PIN.__doc__ = "GPIO pin for the success indicator LED"
BUTTON_PIN.__doc__ = "GPIO pin number for the button"

NUM_ROWS.__doc__ = "Number of rows in the block reader"
NUM_BLOCKS.__doc__ = "Number of blocks per row in the block reader"

MUX_INPUTS.__doc__ = "Number of inputs for the multiplexer (Datasheet)"
MUX_SELS.__doc__ = "Number of select pins for the multiplexer"

SEL0.__doc__ = "Select pin 0 for the multiplexer"
SEL1.__doc__ = "Select pin 1 for the multiplexer"
SEL2.__doc__ = "Select pin 2 for the multiplexer"

MUX1.__doc__ = "Multiplexer 1 output pin"
MUX2.__doc__ = "Multiplexer 2 output pin"
MUX3.__doc__ = "Multiplexer 3 output pin"
MUX4.__doc__ = "Multiplexer 4 output pin"
