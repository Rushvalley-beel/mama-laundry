#!/bin/bash
db_path=("database" "database/__fetch" "database/__user")
db_file=("fetch-cache.tmp" "fetch-raw.tmp" "fetch-raw.md5" "fetch-user.tmp" "fetch-data-invoice.tmp" "fetch-data-date.tmp" "fetch-data-time.tmp" "fetch-data-total.tmp" "fetch-data-paid.tmp" "fetch-data-change.tmp" "fetch-data-zjoin.tmp" "fetch-data-zstatus.tmp" "fetch-zuser.tmp")

if [[ "$UID" -eq "0" ]];then
	case $1 in
	"start"|"restart")
		sudo pkill -f "sudo bash source/bash/run-redirect.sh"
		sudo pkill -f "sudo bash source/bash/run-controller.sh"		
		sudo pkill -f "tail -f"		
		sudo pkill -f "npm start"
		sudo pkill -f "/usr/bin/node server.js"
		sudo pkill -f "node /home/cookie/gitrepo/hotpotcookie/mama-laundry/node_modules/.bin/nodemon server.js"
		sudo bash source/bash/run-init.sh
		cache_file=$(cat ${db_path[1]}/${db_file[0]} | tail -n 1 | cut -d ']' -f 2 | cut -c 2-)				
		sudo npm start &>> $cache_file &
		sudo bash source/bash/run-redirect.sh &	
		sudo bash source/bash/run-controller.sh &			
		;;
	"stop")
		sudo pkill -f "sudo bash source/bash/run-redirect.sh"
		sudo pkill -f "sudo bash source/bash/run-controller.sh"				
		sudo pkill -f "tail -f"		
		sudo pkill -f "npm start"
		sudo pkill -f "/usr/bin/node server.js"
		sudo pkill -f "node /home/cookie/gitrepo/hotpotcookie/mama-laundry/node_modules/.bin/nodemon server.js"
		;;
	"update")
		## list semua folder, user input nama, cek apakah input / folder itu ada
		echo -e "LIST OF CUSTOMERS\n---"
		ls -l "${db_path[2]}/" | grep '^d'
		echo "---"
		catch_csv=""
		read -p "CUSTOMER NAME  : " get_cust
		read -p "INVOICE NUMBER : " get_invoice
		check_cust=$(ls -l "${db_path[2]}/" | grep "^d" | grep "$get_cust")
		if [[ $get_invoice && $get_cust && $check_cust ]]; then
			dir_cust=$(ls -l "${db_path[2]}/" | grep "^d" | grep "$get_cust" | cut -d ":" -f 2 | cut -d ' ' -f 2)
			touch ${db_path[2]}/$dir_cust/$dir_cust.csv.ldryn; sudo rm ${db_path[2]}/$dir_cust/$dir_cust.csv.ldryn
			touch ${db_path[2]}/$dir_cust/$dir_cust.csv.chemn; sudo rm ${db_path[2]}/$dir_cust/$dir_cust.csv.chemn
			touch ${db_path[2]}/$dir_cust/$dir_cust.csv.statn; sudo rm ${db_path[2]}/$dir_cust/$dir_cust.csv.statn

			IFS=$" "
			read -a arr_invoice <<< $get_invoice
			get_invoice=""
			for i in ${arr_invoice[@]}; do
				get_invoice+="$i|"
			done
			get_invoice=$(echo "${get_invoice::-1}")

			ls -l "${db_path[2]}/$dir_cust/" | grep ".cmb." | cut -d ":" -f 2 | cut -d ' ' -f 2 > "${db_path[1]}/${db_file[12]}"

			while IFS= read -r cmb_file; do
				check_invoice=$(cat "${db_path[2]}/$dir_cust/$cmb_file" | grep -E "$get_invoice")
				if [[ $check_invoice ]]; then
					catch_csv="$cmb_file"
					echo "---"
					cat ${db_path[2]}/$dir_cust/$dir_cust.csv.* | grep "\-\-\-" | uniq
					cat ${db_path[2]}/$dir_cust/$dir_cust.csv.* | grep "INVOICE" | uniq					
					cat ${db_path[2]}/$dir_cust/$dir_cust.csv.* | grep "\-\-\-" | uniq
					cat ${db_path[2]}/$dir_cust/$dir_cust.csv.* | grep -E "$get_invoice"					
					cat ${db_path[2]}/$dir_cust/$dir_cust.csv.* | grep "\-\-\-" | uniq
				fi
			done < "${db_path[1]}/${db_file[12]}"
			echo "---"
			read -p "CHANGE STATUS  : " get_stat
			echo "---"			
			if [[ $get_stat ]]; then
				touch "${db_path[2]}/$dir_cust/$dir_cust.saved"
				IFS=$'|'
				read -a arr_invoice2 <<< "$get_invoice"
				for each_invoice in ${arr_invoice2[@]}; do
					check_saved=$(cat "${db_path[2]}/$dir_cust/$dir_cust.saved" | grep "$each_invoice")
					if [[ $check_saved ]]; then
						last_stat=$(cat "${db_path[2]}/$dir_cust/$dir_cust.saved" | grep "$each_invoice" | cut -d ' ' -f 2)
						sed -in "s/$each_invoice $last_stat/$each_invoice $get_stat/" "${db_path[2]}/$dir_cust/$dir_cust.saved"
					else
						echo "$each_invoice $get_stat" >> "${db_path[2]}/$dir_cust/$dir_cust.saved"
					fi
				done				
				ext_csv=$(echo "$catch_csv" | cut -d '.' -f 4)
				while IFS= read -r rule_saved; do
					while IFS= read -r rule_based; do
						saved_ivc=$(echo "$rule_saved" | cut -d ' ' -f 1)
						saved_sts=$(echo "$rule_saved" | cut -d ' ' -f 2)						
						get_rule=$(echo "$rule_based" | grep "$saved_ivc")
						if [[ "$get_rule" ]]; then
							#echo "$get_rule" | cut -d ' ' -f 2
							IFS=$'|'
							read -a arr_rule <<< "$get_rule"
							arr_rule[7]=$saved_sts
							#echo -e "|${arr_rule[1]}|${arr_rule[2]}|${arr_rule[3]}|${arr_rule[4]}|${arr_rule[5]}|${arr_rule[6]}| ${arr_rule[7]} |"
							sed -in "s/$get_rule/|${arr_rule[1]}|${arr_rule[2]}|${arr_rule[3]}|${arr_rule[4]}|${arr_rule[5]}|${arr_rule[6]}| ${arr_rule[7]} |/" "${db_path[2]}/$dir_cust/$dir_cust.csv.$ext_csv"
						fi
					done < "${db_path[2]}/$dir_cust/$dir_cust.csv.$ext_csv"
				done < "${db_path[2]}/$dir_cust/$dir_cust.saved"
				cat "${db_path[2]}/$dir_cust/$dir_cust.csv.$ext_csv"
				touch ${db_path[2]}/$dir_cust/$dir_cust.csv.ldryn; sudo rm ${db_path[2]}/$dir_cust/$dir_cust.csv.ldryn
				touch ${db_path[2]}/$dir_cust/$dir_cust.csv.chemn; sudo rm ${db_path[2]}/$dir_cust/$dir_cust.csv.chemn
				touch ${db_path[2]}/$dir_cust/$dir_cust.csv.statn; sudo rm ${db_path[2]}/$dir_cust/$dir_cust.csv.statn
				touch ${db_path[2]}/$dir_cust/$dir_cust.savedn; sudo rm ${db_path[2]}/$dir_cust/$dir_cust.savedn
			fi

		#	if [[ "$" ]]; then
		#	fi
		fi
		;;
	esac
fi
