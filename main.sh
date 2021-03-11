#!/bin/bash
db_path=("database" "database/fetch")
db_file=("fetch-cache.tmp" "fetch-raw.log")

if [[ "$UID" -eq "0" ]];then
	case $1 in
	"start"|"restart")
		sudo pkill -f "sudo bash source/bash/run-redirect.sh"
		sudo pkill -f "tail -f"		
		sudo pkill -f "npm start"
		sudo pkill -f "/usr/bin/node server.js"
		sudo pkill -f "node /home/cookie/gitrepo/hotpotcookie/mama-laundry/node_modules/.bin/nodemon server.js"
		sudo bash source/bash/run-init.sh
		cache_file=$(cat ${db_path[1]}/${db_file[0]} | tail -n 1 | cut -d ']' -f 2 | cut -c 2-)		
		
		sudo npm start &>> $cache_file &
		sudo bash source/bash/run-redirect.sh &		
		;;
	"stop")
		sudo pkill -f "sudo bash source/bash/run-redirect.sh"
		sudo pkill -f "tail -f"		
		sudo pkill -f "npm start"
		sudo pkill -f "/usr/bin/node server.js"
		sudo pkill -f "node /home/cookie/gitrepo/hotpotcookie/mama-laundry/node_modules/.bin/nodemon server.js"
		;;
	esac
fi
