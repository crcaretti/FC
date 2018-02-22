#!/bin/sh
#Requires MEGAcmd, git, mv, cd, mkidr, echo
COUNTER=0
while [ $COUNTER -ge 0 ]; do LocalDir=/tmp/VZZ RemoteDir=GitHTML U=Spait1972@dayrep.com P=Spait1972@dayrep.com
	if [ $COUNTER -eq 0 ]; then mega-login $U $P && mega-mkdir $RemoteDir && mega-export -a $RemoteDir && mkdir $LocalDir
	git clone -q https://gitgud.io/pregmodfan/fc-pregmod.git $LocalDir
	fi
	cd $LocalDir/ && AbrevHash=`git log -n1 --abbrev-commit --reverse |grep -m1 commit | sed 's/commit //'`
	if [ $COUNTER -eq 0 ]; then ./compile > /dev/null && mv bin/FC_pregmod.html "bin/FC-pregmod-$(date '+%F-%H-%M' --utc --date="$(git show '--format=format:%cD' HEAD)")-$AbrevHash.html" && mega-put bin/*.html $RemoteDir
	fi
	git pull| if [ "Already up to date" ]; then exit
		elif [ ! "Already up to date" ]; then rm bin/*.html && ./compile > /dev/null && mv bin/FC_pregmod.html "bin/FC-pregmod-$(date '+%F-%H-%M' --utc --date="$(git show '--format=format:%cD' HEAD)")-$AbrevHash.html" && mega-put bin/*.html $RemoteDir
		fi
	let COUNTER=COUNTER+1 && mega-logout > /dev/null && sleep 300s
done