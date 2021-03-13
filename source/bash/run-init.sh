#!/bin/bash
#--------------
node_port=$(cat server.js | grep "const port" | cut -d '=' -f 2 | cut -c 2- | cut -d ';' -f 1)
tmp_file=$(mktemp --suffix ".tmp")
db_path=("database" "database/__fetch" "database/__user")
db_file=("fetch-cache.tmp" "fetch-raw.log" )
curdate=$(date +'[%x %X]')
for dir in ${db_path[@]}; do
	if [[ ! -d $dir ]]; then
		mkdir $dir
	fi
	echo -e "Preparing $dir/ ..."; sleep 0.5	
done
for file in ${db_file[@]}; do
	touch ${db_path[1]}/$file
	if [[ "$file" == "fetch-cache.tmp" ]]; then
		echo "$curdate $tmp_file" >> ${db_path[1]}/$file
	fi
	echo -e "Preparing ${db_path[1]}/$file ..."; sleep 0.5
done
echo -e "Caching on $tmp_file ..."; sleep 0.5
echo -e "Listening on port ::$node_port ...\n"; sleep 0.5