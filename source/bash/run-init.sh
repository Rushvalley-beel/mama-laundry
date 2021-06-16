#!/bin/bash
#--------------
node_port=$(cat server.js | grep "const port" | cut -d '=' -f 2 | cut -c 2- | cut -d ';' -f 1)
tmp_file=$(mktemp --suffix ".tmp")
db_path=("log")
db_file=("fetch-cache.log" "fetch-raw.log" "fetch-tablehash.md5")
curdate=$(date +'[%x %X]')
for dir in ${db_path[@]}; do
	if [[ ! -d $dir ]]; then
		mkdir $dir
	fi
	echo -e "Preparing $dir/ ..."; sleep 0.5
done
for file in ${db_file[@]}; do
	touch ${db_path[0]}/$file
	if [[ "$file" == "fetch-cache.log" ]]; then
		echo "$curdate $tmp_file" >> ${db_path[0]}/$file
	fi
	echo -e "Preparing ${db_path[0]}/$file ..."; sleep 0.5
done
echo -e "Caching buffer on $tmp_file ..."; sleep 0.5
echo -e "Listening request on port ::$node_port ...\n"; sleep 0.5