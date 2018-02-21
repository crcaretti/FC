#!/bin/sh
#Requires MEGAcmd, git, mv, cd, mkidr, echo
COUNTER=0
while [ $COUNTER -ge 0 ]; do LocalDir=~/fc-pregmod/ RemoteDir=FC-GIT U=anon@anon.anon P=13245 && mega-login $U $P
	if [ $COUNTER -eq 0 ]; then mega-login $U $P && mega-mkdir $RemoteDir && mega-export -a $RemoteDir && mkdir $LocalDir
	git clone -q https://gitgud.io/pregmodfan/fc-pregmod.git $LocalDir
	fi
	cd $LocalDir/ && AbrevHash=`git log -n1 --abbrev-commit --reverse |grep -m1 commit | sed 's/commit //'`
	if [ $COUNTER -eq 0 ]; then echo "First run. Compliling, formatting and placing .html." && ./compile > /dev/null && mv bin/FC_pregmod.html "bin/FC-pregmod-$(date '+%F-%H-%M' --utc --date="$(git show '--format=format:%cD' HEAD)")-$AbrevHash.html" && mega-put bin/*.html $RemoteDir
	fi
	git pull| if [ "Already up to date" ]; then echo "No updated files, exiting." && mega-logout > /dev/null && exit
		elif [ ! "Already up to date" ]; then echo "Compliling, formatting and placing updated .html." && rm bin/*.html && ./compile > /dev/null && mv bin/FC_pregmod.html "bin/FC-pregmod-$(date '+%F-%H-%M' --utc --date="$(git show '--format=format:%cD' HEAD)")-$AbrevHash.html" && mega-put bin/*.html $RemoteDir && echo "Updated .html placed."
		fi
	let COUNTER=COUNTER+1 && mega-logout > /dev/null && sleep 300s
done