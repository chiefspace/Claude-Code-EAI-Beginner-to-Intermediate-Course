"""Tests for the calculator module."""

from calculator import add, subtract, multiply, divide, calc_avg, do_math


def test_add():
    assert add(2, 3) == 5


def test_add_negative():
    assert add(-1, 1) == 0


def test_subtract():
    assert subtract(10, 4) == 6


def test_multiply():
    assert multiply(3, 4) == 12


def test_multiply_by_zero():
    assert multiply(5, 0) == 0


def test_divide():
    assert divide(10, 2) == 5.0


def test_calc_avg():
    assert calc_avg([10, 20, 30]) == 20.0


def test_do_math_add():
    assert do_math(1, 2, "add") == 3


def test_do_math_subtract():
    assert do_math(5, 3, "subtract") == 2


def test_do_math_unknown():
    assert do_math(1, 2, "power") is None
