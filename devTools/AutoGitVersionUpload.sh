## 	Requires megatools
LocalDIR=~/fc-pregmod/
RemoteDIR=FCGIT
Uname=anon
Upass=13245
cd $LocalDIR/
git pull
rm bin/*.html
./compile-git
mv bin/*.html bin/html/
megacopy -l bin/html/ -r /Root/$RemoteDIR --disable-previews --no-ask-password -u $Uname -p $Upass
