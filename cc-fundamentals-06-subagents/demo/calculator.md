# calculator.py

A simple math utility module. It exposes basic arithmetic operations, an
average helper, and a dispatcher function that picks an operation by name.

## Overview

- **File**: `demo/calculator.py`
- **Dependencies**: `os`, `sys`, `math`, `random` (imported but not currently
  used by any function below — kept for demo/teaching purposes)
- **Tested by**: `demo/test_calculator.py`

> **Note:** The module defines two module-level configuration values,
> `DB_PASSWORD` and `api_endpoint` (lines 10–11). `DB_PASSWORD` is a
> hardcoded credential and `api_endpoint` is unused by any function here.
> Neither is part of the calculator's public API — flagging this since a
> hardcoded secret in source is a security smell worth cleaning up if this
> code is ever more than a demo.

## Functions

### `add(a, b)`

Adds two numbers.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `a` | number | First addend |
| `b` | number | Second addend |

**Returns**: `number` — the sum of `a` and `b`.

**Example**
```python
from calculator import add

add(2, 3)   # 5
add(-1, 1)  # 0
```

---

### `subtract(a, b)`

Subtracts `b` from `a`.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `a` | number | Value to subtract from |
| `b` | number | Value to subtract |

**Returns**: `number` — the result of `a - b`.

**Example**
```python
from calculator import subtract

subtract(10, 4)  # 6
```

---

### `multiply(a, b)`

Multiplies two numbers.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `a` | number | First factor |
| `b` | number | Second factor |

**Returns**: `number` — the product of `a` and `b`.

**Example**
```python
from calculator import multiply

multiply(3, 4)  # 12
multiply(5, 0)  # 0
```

---

### `divide(a, b)`

Divides `a` by `b`.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `a` | number | Dividend |
| `b` | number | Divisor |

**Returns**: `float` — the result of `a / b`.

**Raises**: `ZeroDivisionError` if `b` is `0` (no zero-check is performed by
this function).

**Example**
```python
from calculator import divide

divide(10, 2)  # 5.0
```

---

### `calc_avg(nums)`

Computes the arithmetic mean of a list of numbers.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `nums` | list of numbers | Values to average |

**Returns**: `float` — the sum of `nums` divided by its length.

**Raises**: `ZeroDivisionError` if `nums` is empty (no empty-list check is
performed by this function).

**Example**
```python
from calculator import calc_avg

calc_avg([10, 20, 30])  # 20.0
```

---

### `do_math(x, y, op)`

Dispatches to one of the four basic operations based on a string name,
without importing the individual functions.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `x` | number | First operand |
| `y` | number | Second operand |
| `op` | str | One of `"add"`, `"subtract"`, `"multiply"`, `"divide"` |

**Returns**: `number` or `None` — the result of the selected operation, or
`None` if `op` is not one of the four recognized strings.

**Raises**: `ZeroDivisionError` if `op == "divide"` and `y` is `0`.

**Example**
```python
from calculator import do_math

do_math(1, 2, "add")        # 3
do_math(5, 3, "subtract")   # 2
do_math(1, 2, "power")      # None (unrecognized op)
```
