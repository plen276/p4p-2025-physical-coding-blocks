set(PROJECT embedded)

cmake_minimum_required(VERSION 3.12)

set(PICO_SDK_FETCH_FROM_GIT ON)
set(PICO_BOARD pico_w)

# Include the SDK
include(pico_sdk_import.cmake)

# Initialize the SDK
pico_sdk_init()

# Include other libraries
include(FetchContent)

set(ENABLE_CJSON_UTILS On CACHE BOOL "Enable cJSON utils")
set(ENABLE_CJSON_TEST Off CACHE BOOL "Disable cJSON test")
FetchContent_Declare(
        cJSON
        GIT_REPOSITORY https://github.com/DaveGamble/cJSON
        GIT_TAG        v1.7.18
)
FetchContent_MakeAvailable(cJSON)
configure_file(${cJSON_SOURCE_DIR}/cJSON.h ${CMAKE_BINARY_DIR}/include/cJSON/cJSON.h)

project(${PROJECT} C CXX)

set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)

# Automatically add all C source files and header files
file(GLOB_RECURSE SOURCES "src/*.c")
file(GLOB_RECURSE HEADERS "include/*.h")

add_executable(${PROJECT} ${SOURCES})

# Include headers
target_include_directories(${PROJECT} PRIVATE include ${CMAKE_BINARY_DIR}/include)

target_link_libraries(${PROJECT}
        pico_stdlib
        hardware_adc
        pico_cyw43_arch_lwip_threadsafe_background
        pico_lwip_mbedtls
        pico_mbedtls
        pico_stdlib
        cjson
)

pico_enable_stdio_usb(${PROJECT} 1)
pico_enable_stdio_uart(${PROJECT} 0)

pico_add_extra_outputs(${PROJECT})
