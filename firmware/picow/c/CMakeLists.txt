# Generated Cmake Pico project file

cmake_minimum_required(VERSION 3.13)

set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Initialise pico_sdk from installed location
# (note this can come from environment, CMake cache etc)

# == DO NOT EDIT THE FOLLOWING LINES for the Raspberry Pi Pico VS Code Extension to work ==
if(WIN32)
    set(USERHOME $ENV{USERPROFILE})
else()
    set(USERHOME $ENV{HOME})
endif()
set(sdkVersion 2.2.0)
set(toolchainVersion 14_2_Rel1)
set(picotoolVersion 2.2.0)
set(picoVscode ${USERHOME}/.pico-sdk/cmake/pico-vscode.cmake)
if (EXISTS ${picoVscode})
    include(${picoVscode})
endif()
# ====================================================================================
set(PICO_BOARD pico_w CACHE STRING "Board type")

# set(PICO_CYW43_ARCH_ENABLE_LWIP_ALTCP 1)
# target_compile_definitions(p4p_physical_coding_blocks PRIVATE _POSIX_VERSION=200112L)

# Pull in Raspberry Pi Pico SDK (must be before project)
include(pico_sdk_import.cmake)

# message(STATUS "PICO_SDK_PATH is: ${PICO_SDK_PATH}")

project(p4p_physical_coding_blocks C CXX ASM)

# Initialise the Raspberry Pi Pico SDK
pico_sdk_init()

# Main project executable
add_executable(p4p_physical_coding_blocks
    src/main.c
    src/api.c
    src/button.c
    src/reader.c
    src/tls.c
    src/wifi.c
    lib/cjson/cJSON.c
    src/led.c
)

# Set include directories
target_include_directories(p4p_physical_coding_blocks PRIVATE
    include
    lib/cjson
    # ${PICO_SDK_PATH}/lib/mbedtls/include/
    # ${CMAKE_CURRENT_LIST_DIR}
    # ${CMAKE_CURRENT_LIST_DIR}/..
    # ${PICO_SDK_PATH}/lib/mbedtls/include/mbedtls
    # ${PICO_SDK_PATH}/lib/mbedtls/include/mbedtls/library
    # ${PICO_SDK_PATH}/lib/lwip/src/include
)

# Link libraries
target_link_libraries(p4p_physical_coding_blocks
    # pico_cyw43_arch_lwip_poll
    hardware_adc
    pico_cyw43_arch_lwip_threadsafe_background
    pico_lwip_mbedtls
    pico_mbedtls
    pico_stdlib
    # pico_stdlib              # for core functionality
    # pico_cyw43_arch_lwip_poll  # for WiFi functionality
    # pico_cyw43_arch_none    # for GPIO access
    # lwip                     # for networking
    # mbedtls                  # for TLS/SSL
    # mbedx509                 # for X.509 certificates
    # mbedcrypto               # for cryptographic functions
)

# Add compile definitions for WiFi and TLS
target_compile_definitions(p4p_physical_coding_blocks PRIVATE
    # CYW43_LWIP=1
    # PICO_CYW43_ARCH_POLL=1
    # By default verification is optional (MBEDTLS_SSL_VERIFY_OPTIONAL)
    # Make it required for this test
    ALTCP_MBEDTLS_AUTHMODE=MBEDTLS_SSL_VERIFY_REQUIRED
)

pico_enable_stdio_usb(p4p_physical_coding_blocks 1)
pico_enable_stdio_uart(p4p_physical_coding_blocks 0)

# Create map/bin/hex file etc.
pico_add_extra_outputs(p4p_physical_coding_blocks)

# Ignore warnings from lwip code
set_source_files_properties(
    ${PICO_LWIP_PATH}/src/apps/altcp_tls/altcp_tls_mbedtls.c
    PROPERTIES
    COMPILE_OPTIONS "-Wno-unused-result"
)
