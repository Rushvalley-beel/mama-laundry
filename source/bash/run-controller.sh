#!/bin/bash
#---------------
db_path=("log")
db_file=("fetch-cache.log" "fetch-raw.log" "fetch-tablehash.md5" "fetch-whatsapp.txt" "fetch-numberdest.txt" "fetch-trxdetail.tmp")
saved_hash=$(cat ${db_path[0]}/${db_file[2]})
counter=1
while :
do
	current_hash=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "CHECKSUM TABLE TRX" --silent 2>&1 | cut -d 'X' -f 2 | tr -s '\t' ' ' | cut -d ' ' -f 2 | sed -n '2p')
	if [[ $current_hash != $saved_hash ]]; then
		echo $current_hash > ${db_path[0]}/${db_file[2]}
		saved_hash=$(cat ${db_path[0]}/${db_file[2]})
		hash_t=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 1)
		hash_c=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 2)		
		trx_curdate=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 3 | tr -s '-' '/')
		trx_check_in=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 4 | tr -s '-' '/')
		trx_check_out=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 5 | tr -s '-' '/')
		trx_product=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 6)
		trx_total=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 7 | tr -s '.' ',')
		trx_paid=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 8 | tr -s '.' ',')
		trx_changes=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 9 | tr -s '.' ',')
		trx_status=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 10)

		trx_total=$(echo "$trx_total" | sed 's/......$/.&/;t;s/^.$/.0&/')
		trx_paid=$(echo "$trx_paid" | sed 's/......$/.&/;t;s/^.$/.0&/')
		trx_changes=$(echo "$trx_changes" | sed 's/......$/.&/;t;s/^.$/.0&/')

		cust_name=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM CUST WHERE HASH = '$hash_c';" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 2)
		cust_phone=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM CUST WHERE HASH = '$hash_c';" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 3)
		form_phone=$(echo "$cust_phone" | cut -c 2-)
		detail_message=""
		sleep 20
		case $trx_product in
			"LAUNDRY & DRY CLEANING")
				trx_product="LAUNDRY"
				trx_detail_count=$(mysql -u root -pirsyadndu1ABC mama_laundry -e "SELECT COUNT(HASH_T) FROM SUB_TRX_LDRY WHERE HASH_T = '$hash_t'" --silent 2>&1 | tail -n -1)
				counter=1
				#detail_message="$counter / $trx_detail_count%0a"
				while [[ $counter -le $trx_detail_count ]]; do
					no_item=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_LDRY WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 1); sleep 3
					item=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_LDRY WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 3); sleep 3
					service=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_LDRY WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 4); sleep 3
					baseprice=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_LDRY WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 5 | tr -s '.' ',' | sed 's/......$/.&/;t;s/^.$/.0&/'); sleep 3
					qty=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_LDRY WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 6); sleep 3
					total=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_LDRY WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 7 | tr -s '.' ',' | sed 's/......$/.&/;t;s/^.$/.0&/'); sleep 3
					detail_message+="$no_item |$item ($service)%0a  |$qty x $baseprice : $total%0a"
					counter=$(($counter + 1))
					sleep 5
				done
				;;
			"SUPER CHEMICAL LAUNDRY")
				trx_product="CHEMICAL"
				trx_detail_count=$(mysql -u root -pirsyadndu1ABC mama_laundry -e "SELECT COUNT(HASH_T) FROM SUB_TRX_CHEM WHERE HASH_T = '$hash_t'" --silent 2>&1 | tail -n -1)
				counter=1
				#detail_message="$counter / $trx_detail_count%0a"
				while [[ $counter -le $trx_detail_count ]]; do
					no_item=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 1); sleep 3
					item=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 3); sleep 3
					parfume=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 4); sleep 3
					baseprice=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 5 | tr -s '.' ',' | sed 's/......$/.&/;t;s/^.$/.0&/'); sleep 3
					qty=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 6); sleep 3
					container=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 7); sleep 3
					ctr_price=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 8 | tr -s '.' ',' | sed 's/......$/.&/;t;s/^.$/.0&/'); sleep 3
					ctr_qty=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 9); sleep 3
					total=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_CHEM WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 10 | tr -s '.' ',' | sed 's/......$/.&/;t;s/^.$/.0&/'); sleep 3
					detail_message+="$no_item |$parfume ($item)"
					if [[ "$container" != "BOTTLE" ]]; then
						detail_message+=" %2b $ctr_qty $container"
					fi
					detail_message+="%0a  |$qty x $baseprice : $total"
					if [[ "$container" != "BOTTLE" ]]; then
						detail_message+="%0a  |(%2b $ctr_price)"
					fi
					detail_message+="%0a"
					counter=$(($counter + 1))
					sleep 5
				done
				;;
			"STATIONERY & LEMINERAL")
				trx_product="STATIONERY"
				trx_detail_count=$(mysql -u root -pirsyadndu1ABC mama_laundry -e "SELECT COUNT(HASH_T) FROM SUB_TRX_STAT WHERE HASH_T = '$hash_t'" --silent 2>&1 | tail -n -1)
				counter=1
				##
				#detail_message="$counter / $trx_detail_count%0a"
				while [[ $counter -le $trx_detail_count ]]; do
					no_item=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_STAT WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 1); sleep 3
					item=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_STAT WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 3); sleep 3
					baseprice=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_STAT WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 4 | tr -s '.' ',' | sed 's/......$/.&/;t;s/^.$/.0&/'); sleep 3
					qty=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_STAT WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 5); sleep 3
					total=$(mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM SUB_TRX_STAT WHERE NO_ITEM = $counter" --silent 2>&1 | grep "$hash_t" | tr -s '\t' '@' | cut -d '@' -f 6 | tr -s '.' ',' | sed 's/......$/.&/;t;s/^.$/.0&/'); sleep 3
					detail_message+="$no_item |$item%0a  |$qty x $baseprice : $total%0a"
					counter=$(($counter + 1))
					sleep 5
				done
				;;
		esac

		message="*[ MAMA LAUNDRY ]*\`\`\`%0a-----%0aNAME: $cust_name%0aHP  : $cust_phone%0aTIME: $trx_curdate%0aINVC: $hash_t%0a-----%0aPROD: $trx_product%0aEST : $trx_check_in -- $trx_check_out%0a-----%0a"
		message+="$detail_message"
		message+="-----%0aTOT : Rp $trx_total%0aPAID: Rp $trx_paid%0aRTRN: Rp $trx_changes%0a-----%0aSTAT: $trx_status%0a-----%0aJL. SIAGA RAYA NO. 42C%0aPEJATEN BARAT, PS. MINGGU 12520%0aINFO (08212-533-7746)\`\`\`"
		echo "+62$form_phone" > "${db_path[0]}/${db_file[4]}"
		echo "$message" > "${db_path[0]}/${db_file[3]}" &
		wait
		sleep 10
		nohup sudo su - cookie -c 'export DISPLAY=:0 && python3 Git/main/mama-laundry/source/python/send-wa.py' >> "${db_path[0]}/${db_file[1]}" 2>> "${db_path[0]}/${db_file[1]}.err"
		wait
	fi
done
