#!/bin/bash
#---------------
db_path=("database" "database/__fetch" "database/__user")
db_file=("fetch-cache.tmp" "fetch-raw.tmp" "fetch-raw.md5" "fetch-user.tmp")
cache_file=$(cat ${db_path[1]}/${db_file[0]} | tail -n 1 | cut -d ']' -f 2 | cut -c 2-)
tail -f $cache_file &>> "${db_path[1]}/${db_file[1]}"