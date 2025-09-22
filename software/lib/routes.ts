export const ROUTES = {
  PICO: {
    REGISTER: "/api/pico/register",
    COMMANDS: "/api/pico/commands",
  },
  ROBOT: {
    GET: "/api/robot?action=get&robotId=default",
    COMPLETE: "/api/robot?action=complete&commandId=cmd_123",
    FAIL: "/api/robot?action=fail&commandId=cmd_123",
    STATUS: "/api/robot?action=status",
    REGISTER: "/api/robot/register",
  },
}
