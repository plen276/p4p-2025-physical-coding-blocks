#include "wifi.h"

#include "pico/cyw43_arch.h"
#include "pico/stdlib.h"

#include "defines.h"
#include "tls.h"

char* wifi_connect()
{
  if (cyw43_arch_init())
  {
    return("[wifi_connect] failed to initialise\n");
    // return;
  }
  cyw43_arch_enable_sta_mode();

  if (cyw43_arch_wifi_connect_timeout_ms(WIFI_SSID, WIFI_PASSWORD,
    CYW43_AUTH_WPA_TKIP_PSK, 30000))
  {
    return "[wifi_connect] failed to connect\n";
    // return;
  }
  else {
    return "[wifi_connect] connected\n";
  }
}

void wifi_disconnect()
{
  cyw43_arch_deinit();
}
