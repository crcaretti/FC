## 	Requires MEGAcmd, git, mv, cd, mkidr, echo
#!/bin/sh
LocalDir=~/fc-pregmod/
RemoteDir=FCGIT
U=anon@anon.anon
P=13245
	mega-login $U $P
if  [[ $1 = "-NewStart" ]]; then
	echo "Option -NewStart is on"
	mega-mkdir $RemoteDir
	mega-export -a $RemoteDir
	mkdir $LocalDir
	git clone https://gitgud.io/pregmodfan/fc-pregmod.git $LocalDir
	cd $LocalDir/
	AbrevHash=`git log -n1 --abbrev-commit |grep -m1 commit | sed 's/commit //'`
	FullHash=`git log -n1 |grep -m1 commit | sed 's/commit //'`
	rm bin/*.html & git pull 
	./compile-git > /dev/null
	mv bin/*.html "bin/FC-pregmod-CommitDate-$(date '+%F %H-%M' --utc --date="$(git show '--format=format:%cD' HEAD)").html"
	mega-put bin/*.html $RemoteDir
	mega-logout
	echo "All done."
else
	echo "Option -NewStart is off"
	cd $LocalDir/
	AbrevHash=`git log -n1 --abbrev-commit |grep -m1 commit | sed 's/commit //'`
	FullHash=`git log -n1 |grep -m1 commit | sed 's/commit //'`
	rm bin/*.html & git pull 
	./compile-git > /dev/null
	mv bin/*.html "bin/FC-pregmod-CommitDate-$(date '+%F %H-%M' --utc --date="$(git show '--format=format:%cD' HEAD)").html"
	mega-put bin/*.html $RemoteDir
	mega-logout
	echo "All done."
fi
