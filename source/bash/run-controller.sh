#!/bin/bash
#---------------
db_path=("database" "database/__fetch" "database/__user")
db_file=("fetch-cache.tmp" "fetch-raw.log")
cache_file=$(cat ${db_path[1]}/${db_file[0]} | tail -n 1 | cut -d ']' -f 2 | cut -c 2-)
md5_raw=$(md5sum ${db_path[1]}/${db_file[1]} | cut -d ' ' -f 1)
while : 
do
	curmonth=$(date +'%B_%Y')
	curdate=$(date +'%d_%B_%Y')
	curdate_rgx=$(date +'%m/%d/%Y')
	checkmonth=$(ls ${db_path[0]}/ | grep $curmonth)
	checkdate=$(ls ${db_path[0]}/$checkmonth | grep $curdate)	
	checkmd5_raw=$(md5sum ${db_path[1]}/${db_file[1]} | cut -d ' ' -f 1)
	if [[ ! "$checkmonth" ]] ;then 				## check directory
		mkdir "${db_path[0]}/$curmonth"
	fi
	if [[ ! "$checkdate" ]] ;then
		touch "${db_path[0]}/$curmonth/$curdate.log"
	fi
	if [[ $checkmd5_raw != $md5_raw ]] ;then	## 
		md5_raw=$(md5sum ${db_path[1]}/${db_file[1]} | cut -d ' ' -f 1)
		cat "${db_path[1]}/${db_file[1]}" | grep "$curdate_rgx" > "${db_path[0]}/$curmonth/$curdate.log"
	fi
done

# cat 13_March_2021.log | grep "customer" | cut -d ':' -f 2 | cut -c 2- | tr -s ' ' '.' | sort | uniq | head -n 2 | tail -n 1
# cat 13_March_2021.log | grep "customer" | cut -d ':' -f 2 | cut -c 2- | tr -s ' ' '.' | sort | uniq | wc -l
