#!/bin/bash
arr=$(cat BU.RETNO_______.rcd | grep "LDRY" | grep "invoice" | cut -d ':' -f 2 | cut -c 2-)
for i in ${arr[@]}
do
	echo "$i"
done
