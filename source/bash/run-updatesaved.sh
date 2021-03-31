#!/bin/bash
#-----------------
a="52.648"
b="122.222"

a=$(echo "$a" | tr -d '.')
b=$(echo "$b" | tr -d '.')

c=$(($b - $a))
echo $c
