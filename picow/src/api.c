#include "api.h"

#include <stdio.h>
#include <string.h>
#include <cJSON.h>

#include "defines.h"

extern bool tls_run_client(const uint8_t *cert, size_t cert_len, const char *server, const char *request, int timeout);

typedef struct TLS_CLIENT_T_
{
    struct altcp_pcb *pcb;
    bool complete;
    int error;
    const char *http_request;
    int timeout;
} TLS_CLIENT_T;

static struct altcp_tls_config *tls_config = NULL;

char *api_create_passthrough_body(char *commands)
{
    // Create a cJSON object with command count
    int num_commands = strlen(commands);
    cJSON *root = cJSON_CreateObject();
    cJSON_AddNumberToObject(root, "count", num_commands);

    // Add commands to commands array
    cJSON *commands_array = cJSON_CreateArray();
    for (int i = 0; i < num_commands; i++)
    {
        char command_str[2] = {commands[i], '\0'}; // Convert char to string
        cJSON_AddItemToArray(commands_array, cJSON_CreateString(command_str));
    }
    cJSON_AddItemToObject(root, "commands", commands_array);

    char *json_output = cJSON_PrintUnformatted(root);
    cJSON_Delete(root);
    return json_output;
}

bool api_request(char *server, uint16_t port, char *target, char *method, char *body)
{
    // Format the request
    uint body_len = strlen(body);
    uint request_len = HTTP_REQUEST_LEN + strlen(method) + strlen(target) + strlen(server) + snprintf(NULL, 0, "%d", port) + snprintf(NULL, 0, "%d", body_len) + body_len;

    char request[request_len + 1]; // 1 for null terminator
    snprintf(request, sizeof(request), HTTP_REQUEST,
             method, target, server, port, body_len, body);

    bool success = tls_run_client(NULL, 0, server, request, API_TIMEOUT_SECS);

    if (success)
        printf("[api_request] Request successful\n");
    else
        printf("[api_request] Request failed\n");

    return success;
}

bool api_request_text(char *server, uint16_t port, char *target, char *method, const char *body)
{
    // Format the request
    uint body_len = strlen(body);
    uint request_len = HTTP_REQUEST_LEN + strlen(method) + strlen(target) + strlen(server) + snprintf(NULL, 0, "%d", port) + snprintf(NULL, 0, "%d", body_len) + body_len;

    char request[request_len + 1]; // 1 for null terminator
    snprintf(request, sizeof(request), HTTP_REQUEST,
             method, target, server, port, body_len, body);

    bool success = tls_run_client(NULL, 0, server, request, API_TIMEOUT_SECS);

    if (success)
        printf("[api_request] Request successful\n");
    else
        printf("[api_request] Request failed\n");

    return success;
}