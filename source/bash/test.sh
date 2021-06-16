#!/bin/bash
current_hash=$(sudo mysql -u bash -pirsyadndu1ABC mama_laundry -e "CHECKSUM TABLE TRX" --silent 2>&1 | cut -d 'X' -f 2 | tr -s '\t' ' ' | cut -d ' ' -f 2 | sed -n '2p')
echo $current_hash
mysql -u bash -pirsyadndu1ABC mama_laundry -e "SELECT * FROM TRX ORDER BY CURDATE DESC LIMIT 1" --silent 2>&1 | sed -n '2p' | tr -s '\t' '@' | cut -d '@' -f 1
