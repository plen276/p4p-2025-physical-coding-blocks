# Pin Mapping Documentation

## Overview

This document outlines the GPIO pin configurations for the Raspberry Pi Pico W as used in the Tangible User Interface (TUI) project.

## Pin Assignments

### LED Indicators

| Pin (GPIO) | Variable Name     | Function         | Description                                       |
|------------|-------------------|------------------|---------------------------------------------------|
| `LED`      | `PICO_LED_PIN`    | Onboard LED      | General status indicator, controlled by the firmware. |
| 2          | `ERROR_LED_PIN`   | Error LED        | Indicates an error state (e.g., Wi-Fi connection failed). |
| 3          | `SUCCESS_LED_PIN` | Success LED      | Indicates a success state (e.g., data sent to server). |

### User Input

| Pin (GPIO) | Variable Name  | Function | Description                               |
|------------|----------------|----------|-------------------------------------------|
| 15         | `BUTTON_PIN`   | Button   | The main button used to send the command queue to the server. |

### Multiplexer Control

The firmware uses multiplexers to read the state of the grid of physical blocks.

#### Select Pins

These pins are used to select the active channel on all multiplexers simultaneously.

| Pin (GPIO) | Variable Name | Function    | Description      |
|------------|---------------|-------------|------------------|
| 16         | `SEL0`        | Select Pin 0| MUX Select Line 0|
| 17         | `SEL1`        | Select Pin 1| MUX Select Line 1|
| 18         | `SEL2`        | Select Pin 2| MUX Select Line 2|

#### Input Pins (from MUX outputs)

These pins read the output from the multiplexers. Each pin corresponds to a column of blocks in the TUI grid.

| Pin (GPIO) | Variable Name | Function | Description                               |
|------------|---------------|----------|-------------------------------------------|
| 11         | `MUX1`        | MUX 1 In | Reads the output of the first multiplexer.  |
| 10         | `MUX2`        | MUX 2 In | Reads the output of the second multiplexer. |
| 9          | `MUX3`        | MUX 3 In | Reads the output of the third multiplexer.  |
| 8          | `MUX4`        | MUX 4 In | Reads the output of the fourth multiplexer. |
