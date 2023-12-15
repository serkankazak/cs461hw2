#!/bin/bash

if [ "$1" == "" ]; then exit; fi

for i in `seq 1 100`; do

	bash s.sh 10 100 "$1" > "res${i}.txt" &

done
