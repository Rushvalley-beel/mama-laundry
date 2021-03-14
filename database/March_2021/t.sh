#!/bin/bash
get_name=$(cat 14_March_2021.log | cut -d ']' -f 1 | cut -d ' ' -f 1 | cut -c 2- | grep '_' | sort | uniq)
get_name=$(echo $get_name)
while IFS= read -r get_line
do
	echo "$get_line.log"
done < "../__fetch/fetch-user.tmp"
