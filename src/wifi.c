#include "wifi.h"

#include "pico/cyw43_arch.h"
#include "pico/stdlib.h"

#include "defines.h"
#include "tls.h"

void wifi_connect()
{
  if (cyw43_arch_init())
  {
    printf("[wifi_connect] failed to initialise\n");
    return;
  }
  cyw43_arch_enable_sta_mode();

  if (cyw43_arch_wifi_connect_timeout_ms(WIFI_SSID, WIFI_PASSWORD,
                                         CYW43_AUTH_WPA2_AES_PSK, 30000))
  {
    printf("[wifi_connect] failed to connect\n");
    return;
  }
}

void wifi_disconnect()
{
  cyw43_arch_deinit();
}
