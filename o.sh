#!/bin/bash

a=0
b=0
c=0
d=0

for i in `seq 1 100`; do

	na=$(cat "res${i}.txt" | tail -n 4 | head -n 1 | sed 's/^.*> //')
	nb=$(cat "res${i}.txt" | tail -n 3 | head -n 1 | sed 's/^.*> //')
	nc=$(cat "res${i}.txt" | tail -n 2 | head -n 1 | sed 's/^.*> //')
	nd=$(cat "res${i}.txt" | tail -n 1 | head -n 1 | sed 's/^.*> //')

	a=$(echo "$a + $na" | bc)
	b=$(echo "$b + $nb" | bc)
	c=$(echo "$c + $nc" | bc)
	d=$(echo "$d + $nd" | bc)

	cat "res${i}.txt"

done

echo "$a"
echo "$b"
echo "$c"
echo "$d"
