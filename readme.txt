How to mod (basic doc):

1. All sources now in the src subdir, in separate files. 1 passage = 1 file.

2. Special files and dir's:
    - src/config 		- configuration of the story is here.
    - src/config/start.tw 	- contains list of .tw passage files, regenerated automatic, by building scripts. Do not change by hands. (origial passage Start from pregmod renamed and moved to src/events/intro/introSummary.tw) 
    - src/js/storyJS.tw		- special passage with [script] tag - contain all native JavaScript from pregmod. 
    - devTools/tweeGo/targets/sugarcube-2/userlib.js - on original FC JS moved here (I deleted it after moving JS to storyJS.tw). Compare to storyJS.tw but do not copy file here. May conflict with src/js/storyJS.tw if copied.
    - src/pregmod 		- I put all pregmod-only passages here.
    - .gitignore 		- special file for git - to ignore some files. For example - compilation results.
    
3. Compilation:
    
    Windows:
    Run compile.bat - result will be file bin/FC_pregmod.html
    Second run of compile.but will overwrite bin/FC_pregmod.html without prompt.

    Linux:
    Ensure executable permission on file "devTools/tweeGo/tweego" (not tweego.exe!)
    Ensure executable permission on file "compile" 
    In the root dir of sources (where you see src, devTools, bin...) run command "./compile" from console
    compile-git will produce the same result file but with current commit hash in filename.

    Mac: 
    Don't supported directly (I don't have access to Mac for testing). 
    But potentially can be used linux compilation script if you download tweego for mac from here: https://bitbucket.org/tmedwards/tweego/downloads/ and replace linux executable with mac executable in ./devTools/tweeGo/ folder. This is not tested though.
    
4. Simple comparing and merging with original FC:

    Use meld tool. Place folder FreeCities (original FC sources tree) near FreeCitiesPregmod (this sources tree) and use command:
    meld FreeCities FreeCitiesPregmod 
    or just select these folders in meld's GUI.

5. All modders will be wery grateful if any, who make some changes to game, with .html file also post his/her resulting src folder tree.

6. For contributors to pregmod: if you don't use git, then you need to post yours version of src folder tree, not just produced FC_pregmod.html file!!! This html file can't be reverted to proper sources, and useless as contribution!

7. Git workflow:
    - Master branch is pregmod-master. Only Pregmodder can add something to it directly. Always contain his last public changes.
    - pregmod-dev - branch with experimental code mainly by pregmodfan. 
    - Any contributions will be placed in separate branches like pregmod-mod-<something> (if it's ready to merge with master complete feature/mod) or pregmod-contrib-<something> if it's partial work until contributions is reviewed.
    
    Typical cycle with git:
	1. Make account on gitgud if you don't have usable one.
	2. Fork main repository through gitgud interface. (Or pull changes from main repo if you already have fork.)
	3. Clone your fork to local machine witn git client  (Or pull changes if already cloned.)
	4. Make you changes as you like, commit, and push result into your forked repository (with git client).
	5. Make merge request through gitgud interface.
    
