#!/bin/bash
#---------------
db_path=("database" "database/__fetch" "database/__user")
db_file=("fetch-cache.tmp" "fetch-raw.tmp" "fetch-raw.md5" "fetch-user.tmp" "fetch-data-invoice.tmp" "fetch-data-date.tmp" "fetch-data-time.tmp" "fetch-data-total.tmp" "fetch-data-paid.tmp" "fetch-data-change.tmp" "fetch-data-zjoin.tmp")
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
		echo "[=============== $curdate_rgx ====] ==================================================" > "${db_path[0]}/$curmonth/$curdate.log" 
		cat "${db_path[1]}/${db_file[1]}" | grep "$curdate_rgx" >> "${db_path[0]}/$curmonth/$curdate.log"
		get_customer=$(cat "${db_path[0]}/$curmonth/$curdate.log" | cut -d ']' -f 1 | cut -d ' ' -f 1 | cut -c 2- | grep '_' | sort | uniq)
		echo $get_customer > "${db_path[1]}/${db_file[3]}"		

		## $1 = LDRY, $2 = ldry
		add-csv() {
			get_invoice=$(cat "${db_path[2]}/$get_line_customer/$get_line_customer.rcd" | grep "$1" | grep "invoice" | cut -d ':' -f 2 | cut -d ' ' -f 2)
			get_date=$(cat "${db_path[2]}/$get_line_customer/$get_line_customer.rcd" | grep "$1" | grep "timestamp" | cut -d ':' -f 2 | cut -d ',' -f 1 | cut -c 2-)			
			get_time=$(cat "${db_path[2]}/$get_line_customer/$get_line_customer.rcd" | grep "$1" | grep "timestamp" | cut -d ',' -f 2 | cut -c 2-)
			get_total=$(cat "${db_path[2]}/$get_line_customer/$get_line_customer.rcd" | grep "$1" | grep "total" | cut -d ':' -f 2 | cut -d ' ' -f 3 | tr -s ',' '.')
			get_paid=$(cat "${db_path[2]}/$get_line_customer/$get_line_customer.rcd" | grep "$1" | grep "paid" | cut -d ':' -f 2 | cut -d ' ' -f 3 | tr -s ',' '.')
			get_change=$(cat "${db_path[2]}/$get_line_customer/$get_line_customer.rcd" | grep "$1" | grep "change" | cut -d ':' -f 2 | cut -d ' ' -f 3 | tr -s ',' '.')

			echo "$get_invoice" > "${db_path[1]}/${db_file[4]}"
			echo "$get_date" > "${db_path[1]}/${db_file[5]}"
			echo "$get_time" > "${db_path[1]}/${db_file[6]}"
			echo "$get_total" > "${db_path[1]}/${db_file[7]}"
			echo "$get_paid" > "${db_path[1]}/${db_file[8]}"
			echo "$get_change" > "${db_path[1]}/${db_file[9]}"

			paste ${db_path[1]}/fetch-data-* > "${db_path[1]}/${db_file[10]}"
			header="---------------------------------------------------------------------\n"
			footer="---------------------------------------------------------------------"
			header+="| INVOICE  | DATE       | TIME        | TOTAL   | PAID    | CHANGE  |\n"
			header+="---------------------------------------------------------------------"
			echo -e "$header" > "${db_path[2]}/$get_line_customer/$get_line_customer.csv.$2"

			while IFS= read -r get_line; do

				IFS=$'\t'
				read -a data_arr <<< "$get_line"
				## 0: change, 1: date, 2: invoice, 3: paid, 4: time, 5: total
				if [[ ${data_arr[0]} && ${data_arr[1]} && ${data_arr[2]} && ${data_arr[3]} && ${data_arr[4]} && ${data_arr[5]} ]]; then
					printf "| %-7s | %-10s | %-11s | %-7s | %-7s | %-7s |\n" "${data_arr[2]}" "${data_arr[1]}" "${data_arr[4]}" "${data_arr[5]}" "${data_arr[3]}" "${data_arr[0]}" >> "${db_path[2]}/$get_line_customer/$get_line_customer.csv.$2"
				fi
			done < "${db_path[1]}/${db_file[10]}"
			echo -e "$footer" >> "${db_path[2]}/$get_line_customer/$get_line_customer.csv.$2"			
		}

		while IFS= read -r get_line_customer; do
			if [[ ! -d "${db_path[2]}/$get_line_customer" ]]; then
				mkdir "${db_path[2]}/$get_line_customer"
			fi
			touch "${db_path[2]}/$get_line_customer/$get_line_customer.rcd"
			touch "${db_path[2]}/$get_line_customer/$get_line_customer.csv.ldry"
			touch "${db_path[2]}/$get_line_customer/$get_line_customer.csv.chem"
			touch "${db_path[2]}/$get_line_customer/$get_line_customer.csv.stat"			
			catch_log_cust=$(cat ${db_path[0]}/*/*.log | grep -E "$get_line_customer|==" | uniq -s 36)
			echo "$catch_log_cust" > "${db_path[2]}/$get_line_customer/$get_line_customer.rcd"

			add-csv "LDRY" "ldry"
			add-csv "CHEM" "chem"
			add-csv "STAT" "stat"

		done < "${db_path[1]}/${db_file[3]}"
	fi
done

# cat 13_March_2021.log | grep "customer" | cut -d ':' -f 2 | cut -c 2- | tr -s ' ' '.' | sort | uniq | head -n 2 | tail -n 1
# cat 13_March_2021.log | grep "customer" | cut -d ':' -f 2 | cut -c 2- | tr -s ' ' '.' | sort | uniq | wc -l
# cat BU.RETNO_______.rcd | grep "LDRY" | grep "total" | cut -d ':' -f 2 | cut -d ' ' -f 3 | tr -s ',' '.'
