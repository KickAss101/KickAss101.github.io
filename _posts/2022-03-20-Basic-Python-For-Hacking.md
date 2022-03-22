---
layout: post
title: "Baisc Python For Hecking"
date: 2022-03-20 00:00:0
permalink: basic-python-for-hacking/
tags: python hacking
---

_A quick guide for the people who know basic python but don't know how to implement it in infosec context._
<br><br>

|Data Types Categories|Types|
|-|-|
|Text types|str|
|Numeric Types|int, float, complex|
|Sequence Types|list(mutable)`[0,1]`, tuple(immutable)`(0,1)`, range|
|Mapping Type|dict `{"key":"value"}`|
|Set Types|set, frozenset `{0,1,2,3}`|
|Boolean Type|bool `True False`|
|Binary Types|bytes, bytearray, memoryview|


> Data type of any object can be obtained by using the `type()` function

---
<center><h2>Handling Web Requests</h2></center>

__Packages__
- requests


|Functions|Description|
|-|-|
|requests.get()|Returns requests.Response() object

- [requests.response() - w3schools](https://www.w3schools.com/python/ref_requests_response.asp)


__Snippet__
```python
import requests
res = requests.get("https://www.google.com/")
content = res.content
print(content)
```
---
<center><h2>Sockets</h2></center> 

```python
import socket
```

---
<center><h2>Command line Arguments</h2></center>

```python
import argparse

# Initialize the parser
parser = argparse.ArgumentParser()

# Add optional parameters
parser.add_argument("-t","--target", help="provide target", type="str",default="google.com")

# Parse arguments
args = parser.parse_args()

print(args.target)

```
Example
```shell
# python3 args.py -t yahoo.com
# python3 args.py --target yahoo.com
```
---
<center><h2>Oops</h2></center>

```python
def main():
	print("test")

if __name__ == __main__:
	main()
```	

< post under construction />

come back later >>