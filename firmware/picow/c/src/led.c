#include "led.h"

#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"

void init_led()
{
	cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 0);
}

void led_on()
{
    cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 1);
	sleep_ms(250);
}

void led_off()
{
	cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 0);
	sleep_ms(250);
}

void led_toggle()
{
	cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, !cyw43_arch_gpio_get(CYW43_WL_GPIO_LED_PIN));
}

void led_blink()
{
	led_on();
	led_off();
}