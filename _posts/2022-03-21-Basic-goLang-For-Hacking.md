---
layout: post
title: "Baisc goLang For Hacking"
date: 2022-03-20 00:00:0
permalink: basic-goLang-for-hacking/
tags: goLang hacking
---
_A quick guide for the people who know scripting in general but don't know goLang._
<br><br>

### Prequests:
- Familiar with programming in general
- Familiarization with C and Python helps but not necessary
<br><br>

|Data Types|Description|
|-|-|
|var x \<type>|Variable declaration|
|x := \<value>|Variable declaration & Assignment|
|var x[\<size>] \<type>|Array declaration|
|x := [3]int{0,1,2}|Array declaration & Assignment|
|x := []int{}|Slice of int type, flexible|
|x := make(map[string]int)|Maps declaration; key-value pairs|
|x["a"] = 1337| Maps Assignment|
|nil|Zero value for pointers, interfaces, maps, slices, func types|
|float64 / float32| float for respective architecture|

|Functions|Description|
|-|-|
|fmt.Println()|Like print() in python|
|fmt.Printf()|Like printf() in C|
|fmt.Scan()|Like scanf() in C|
|string()|Converts int, bytes into string|
|append(array, value)|Append value & return new array|
|len(array)|Return Array length|
|delete(x, "key")|Delete key:value from map "x"|
|errors.New("error!")|User-defined error|

|Formatting|Description|
|-|-|
|%v|Variable|
|%T|type of variable|
|%d|decimal|

__Example__
```go
x := 1337
fmt.Printf("%d %v %T", x, x, x)
```

|Visibility|Scope|Snippet|
|-|-|-|
|Block level|inside blocks `{}`|x := 10|
|Package level|Outside all functions|var int x = 10|
|Global level|Outside all functions with Capital letter convention|var X int = 1337|

---
## Loops
__For Loop__
```go
for i := 0; i<5; i++ {
	fmt.Println(i)
}
```

__While like loop__
```go
i := 0
for i<len(array) {
	fmt.Println(i)
	i++
}
```

__foreach like loop__
```go
for i, v := range array {
	fmt.Println("index:",i,"value:",v)
}
```

---
## Functions

__Function syntax__
```go
func sum(x int, y int) int{
	return x + y
}
```

__Function with multiple return values__
```go
func sum_and_product(x int, y int) (int, int)
	return x+y, x*y
}
```

---
## Struct Type
- Collection of fields

```go
type person struct {
	name string
	age int
}

func main() {
	p := person{name:"Malcom", age:18}
}
```
---
## Pointers
```go
func main() {
	i := 0
	inc(&i)
}
func inc(i *int) {
	*i++
}
```

---

<center><h2>Handling Web Requests</h2></center>

__Packages__
- net/http
- io


|Functions|Description|
|-|-|
|http.Get()|Returns \*http.Response pointer & error|
|io.ReadAll(res.Body)|Returns bytes & error|
|defer res.Body.Close()|Close connection after function ends|

__Snippet__
```go
import (
	"fmt""io"
	"net/http")

func main() {
	res, err := http.Get("https://www.google.com/")
	
	checkError(err)
	defer res.Body.Close()
	
	dataBytes, err := io.ReadAll(res.Body)	
	checkError(err)
	
	content := string(dataBytes)
	fmt.Println(content)
}

// Check for errors
func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
```

< post under construction />

come back later >>