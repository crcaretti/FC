#!/bin/sh

# setup:
# add this to crontab:
# */15 * * * * cd ~/FC/fc-pregmod && git pull --ff-only origin pregmod-master > ~/FC/git_pull.log 2>&1
# and do "ln -s ~/FC/fc-pregmod/devTools/BuildAndIPFSify.sh .git/hooks/post-merge"

# if this script is used as the post-merge hook then
# a) git pull has pulled something
# b) $PWD is fc-pregmod
if [ "$(basename "$0")" != "post-merge" ]; then
	# cd to fc-pregmod based on where this script is
	cd "$(readlink -f "$(dirname "$0")")/.." || exit 1
	git pull
fi

rm bin/*.html
./compile || exit 1

# add the date of the last commit to the file, but don't use colons because Windows (still?) doesn't like them
mv bin/*.html "bin/FC pregmod $(git log -1 --format='%cd' --date='format:%F %H-%M').html"

# add the vector art if it is available
ipfs_hash="nothing"
if [ -e ../resources ]; then
	ipfs_hash="$(ipfs add -w -Q -r bin/*.html ../resources)"
else
	ipfs_hash="$(ipfs add -w -Q bin/*.html)"
fi
ipfs name publish "$ipfs_hash"

# when it's done it will print something like "Published to $your_pubkey: /ipfs/$ipfs_hash"
# You can view the folder at http://127.0.0.1:8080/ipns/$your_pubkey
