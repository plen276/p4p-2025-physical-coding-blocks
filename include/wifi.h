#ifndef PICOW_TLS_CLIENT_H
#define PICOW_TLS_CLIENT_H

#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"

extern bool tls_run_client(const uint8_t *cert, size_t cert_len, const char *server, const char *request, int timeout);

/**
 * Connect to the wifi network.
 */
void wifi_connect();

/**
 * Disconnect from the wifi network.
 */
void wifi_disconnect();

#endif // PICOW_TLS_CLIENT_H