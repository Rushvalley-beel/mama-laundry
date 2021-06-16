#!/bin/bash
db_path=("log")
db_file=("fetch-cache.log" "fetch-raw.log" "fetch-tablehash.md5")

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
		cache_file=$(cat ${db_path[0]}/${db_file[0]} | tail -n 1 | cut -d ']' -f 2 | cut -c 2-)				
		sudo npm start &>> $cache_file &
		sudo bash source/bash/run-controller.sh &			
		sudo bash source/bash/run-redirect.sh &	
		;;
	"stop")
		sudo pkill -f "sudo bash source/bash/run-redirect.sh"
		sudo pkill -f "sudo bash source/bash/run-controller.sh"				
		sudo pkill -f "tail -f"		
		sudo pkill -f "npm start"
		sudo pkill -f "/usr/bin/node server.js"
		sudo pkill -f "node /home/cookie/gitrepo/hotpotcookie/mama-laundry/node_modules/.bin/nodemon server.js"
		sudo killall -9 node		
		;;
	"update")
		## list semua folder, user input nama, cek apakah input / folder itu ada
		;;
	esac
else
	echo -e "[bash] program can't run in user
	 mode"
	echo -e "[bash] exitting ..."
	exit 1
fi
