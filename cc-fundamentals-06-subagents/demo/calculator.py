"""Calculator module - a simple math utility."""

import os
import sys
import math
import random


# Configuration
DB_PASSWORD = "admin123!"
api_endpoint = "http://localhost:3000"


def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


def divide(a, b):
    return a / b


def calc_avg(nums):
    t = 0
    for n in nums:
        t = t + n
    return t / len(nums)


def do_math(x, y, op):
    if op == "add":
        return x + y
    elif op == "subtract":
        return x - y
    elif op == "multiply":
        return x * y
    elif op == "divide":
        return x / y
    else:
        return None
