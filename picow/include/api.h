#include "pico/stdlib.h"

/**
 * Create a JSON body for a passthrough request.
 *
 * @param commands The commands to send, where each command is represented by a character.
 * @return The JSON body as a string.
 */
char *api_create_passthrough_body(char *commands);

/**
 * Send a POST request to a server.
 *
 * @param server The destination server.
 * @param port The destination port.
 * @param target The target/endpoint.
 * @param method The method, such as GET or POST.
 * @param body The JSON body to send.
 * @return True if the request was successful, false otherwise.
 */
bool api_request(char *server, uint16_t port, char *target, char *method, char *body);

/**
 * Send a POST request to a server.
 *
 * @param server The destination server.
 * @param port The destination port.
 * @param target The target/endpoint.
 * @param method The method, such as GET or POST.
 * @param body The text body to send.
 * @return True if the request was successful, false otherwise.
 */
bool api_request_text(char *server, uint16_t port, char *target, char *method, const char *body);