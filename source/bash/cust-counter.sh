#!/bin/bash
#--------------------------------------------------
# COUNTER : counts every complete-transaction order
#--------------------------------------------------
path_db="database"
db_counter=("$path_db/counter_ldry" "$path_db/counter_chem" "$path_db/counter_stat")

for file in ${db_counter[@]};do
	touch $file
	get_ctr=$(cat $file)
	if [[ ! $get_ctr ]];then
		echo "0" > $file
		get_ctr=$(cat $file)
	fi
done

case $1 in
	"ldry")
		idx="0"
		pass="T"
		;;
	"chem")
		idx="1"
		pass="T"
		;;
	"stat")
		idx="2"
		pass="T"
		;;
esac

if [[ $pass ]];then
	get_ctr=$(cat "${db_counter[$idx]}")
	get_ctr=$((++get_ctr))
	echo "$get_ctr" > "${db_counter[$idx]}"
fi
