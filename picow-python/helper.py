import time

from config import VERBOSE


def log(
    *values: object,
) -> None:
    if VERBOSE:
        print(*values)


REQUEST_START_TIME = None


def log_request_time() -> None:
    global REQUEST_START_TIME
    if REQUEST_START_TIME is None:
        print("Warning: REQUEST_START_TIME is not set.")
        return

    elapsed = time.ticks_diff(time.ticks_ms(), REQUEST_START_TIME)
    print(f"Request completed in {elapsed} ms")
