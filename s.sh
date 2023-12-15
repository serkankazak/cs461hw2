#!/bin/bash

if [ "$1" == "" ]; then exit; fi
if [ "$2" == "" ]; then exit; fi
if [ "$3" == "" ]; then exit; fi

r1=0
r2=0
r3=0
r4=0

i=1
while [ "$i" -le "$1" ]; do

	puzz=$(nodejs n.js "$2")
	echo "$i $puzz"

	echo "$i" 1>&2

	p1=$(nodejs n.js "$puzz" "1" "0" "$3")
	echo "   1 $p1";
	p2=$(nodejs n.js "$puzz" "2" "0" "$3")
	echo "   2 $p2";
	p3=$(nodejs n.js "$puzz" "3" "0" "$3")
	echo "   3 $p3";
	p4=$(nodejs n.js "$puzz" "4" "0" "$3")
	echo "   4 $p4";

	if [ "$p1" -gt "0" ]; then ((r1++)); fi
	if [ "$p2" -gt "0" ]; then ((r2++)); fi
	if [ "$p3" -gt "0" ]; then ((r3++)); fi
	if [ "$p4" -gt "0" ]; then ((r4++)); fi

	((i++))
done

echo "1 -> $r1"
echo "2 -> $r2"
echo "3 -> $r3"
echo "4 -> $r4"
