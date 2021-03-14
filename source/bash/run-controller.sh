#!/bin/bash
#---------------
db_path=("database" "database/__fetch" "database/__user")
db_file=("fetch-cache.tmp" "fetch-raw.tmp" "fetch-raw.md5" "fetch-user.tmp")
cache_file=$(cat ${db_path[1]}/${db_file[0]} | tail -n 1 | cut -d ']' -f 2 | cut -c 2-)
md5_raw=$(cat "${db_path[1]}/${db_file[2]}")
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
		IFS='\n'
		echo "$checkmd5_raw" > "${db_path[1]}/${db_file[2]}"
		md5_raw=$(cat "${db_path[1]}/${db_file[2]}")
		echo "[=============== $curdate_rgx] ==================================================" > "${db_path[0]}/$curmonth/$curdate.log" 
		cat "${db_path[1]}/${db_file[1]}" | grep "$curdate_rgx" >> "${db_path[0]}/$curmonth/$curdate.log"
		get_customer=$(cat "${db_path[0]}/$curmonth/$curdate.log" | cut -d ']' -f 1 | cut -d ' ' -f 1 | cut -c 2- | grep '_' | sort | uniq)
		echo $get_customer > "${db_path[1]}/${db_file[3]}"		
		while IFS= read -r get_line_customer; do
			touch "${db_path[2]}/$get_line_customer.rcd"
			catch_log_cust=$(cat "*.log" | grep -E "$get_line_customer|==" | uniq)
			echo "$catch_log_cust" > "${db_path[2]}/$get_line_customer.rcd"
		done < "${db_path[1]}/${db_file[3]}"
	fi
done

# cat 13_March_2021.log | grep "customer" | cut -d ':' -f 2 | cut -c 2- | tr -s ' ' '.' | sort | uniq | head -n 2 | tail -n 1
# cat 13_March_2021.log | grep "customer" | cut -d ':' -f 2 | cut -c 2- | tr -s ' ' '.' | sort | uniq | wc -l
# tangkep invoice buat 