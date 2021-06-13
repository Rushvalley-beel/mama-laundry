#!/bin/bash
#---------------
db_path=("log")
db_file=("fetch-cache.log" "fetch-raw.log")
cache_file=$(cat ${db_path[0]}/${db_file[0]} | tail -n 1 | cut -d ']' -f 2 | cut -c 2-)
tail -f $cache_file &>> "${db_path[0]}/${db_file[1]}"