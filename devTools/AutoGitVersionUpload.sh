#!/bin/sh
#Requires MEGAcmd, git, mv, cd, mkidr, echo
COUNTER=0 
while [ $COUNTER -ge 0 ]; do
LocalDir=~/fc-pregmod/ RemoteDir=FC-GIT U=anon@anon.anon P=13245 && mega-login $U $P
	if [ $COUNTER -eq 0 ]; then mega-mkdir $RemoteDir && mega-export -a $RemoteDir && mkdir $LocalDir && git clone https://gitgud.io/pregmodfan/fc-pregmod.git $LocalDir
	fi 
	 cd $LocalDir/ && AbrevHash=`git log -n1 --abbrev-commit |grep -m1 commit | sed 's/commit //'`
	if [ $COUNTER -eq 0 ]; then
		 echo "First run. Compliling, formatting and placing .html." && ./compile > /dev/null && mv bin/FC_pregmod.html "bin/FC-pregmod-$(date '+%F-%H-%M' --utc --date="$(git show '--format=format:%cD' HEAD)")-$AbrevHash.html" && mega-put bin/*.html $RemoteDir && echo "Compiled .html placed."
	else
		git pull| if [ "Already up to date" ]; then echo "No updated files, exiting." && mega-logout > /dev/null && exit 
		else echo "Compliling, formatting and placing .html." && ./compile > /dev/null && mv bin/FC_pregmod.html "bin/FC-pregmod-$(date '+%F-%H-%M' --utc --date="$(git show '--format=format:%cD' HEAD)")-$AbrevHash.html" && mega-put bin/*.html $RemoteDir && echo "Compiled .html placed."
		fi 
	fi  
	mega-logout > /dev/null && let COUNTER=COUNTER+1 && clear && sleep 900s
done