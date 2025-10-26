#include "pico/stdlib.h"

bool tls_run_client(const uint8_t *cert, size_t cert_len, const char *server, const char *request, int timeout);