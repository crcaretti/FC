How to mod (basic doc):

1. All sources now in the src subdir, in separate files. 1 passage = 1 file.

2. Special files and dir's:
    - src/config 		- configuration of the story is here.
    - src/config/start.tw 	- contains list of .tw passage files, regenerated automatic, by building scripts. Do not change by hands. (origial passage Start from pregmod renamed and moved to src/events/intro/introSummary.tw) 
    - src/js/storyJS.tw		- special passage with [script] tag - contain all native JavaScript from pregmod. 
    - devTools/tweeGo/targets/sugarcube-2/userlib.js - on original FC JS moved here (I deleted it after moving JS to storyJS.tw). Compare to storyJS.tw but do not copy file here. May conflict with src/js/storyJS.tw if copied.
    - src/pregmod 		- I put all pregmod-only passages here.
    - .gitignore 		- special file for git - to ignore some files. For example - compilation results or this file.
    
3. Compilation:
    
    Windows:
    Run compile.bat - result will be file bin/FC.html
    Second run of compile.but will overwrite bin/FC.html without prompt.

    Linux:
    Ensure executable permission on file devTools/tweeGo/tweego (not tweego.exe!)
    in the root dir of sources (where you see src, devTools, bin...) run command "make" from console. Should be installed "build-essential" or at least "make" package.
    
4. Simple comparing and merging with original FC:

    Use meld tool. Place folder FreeCities (original FC sources tree) near FreeCitiesPregmod (this sources tree) and use command:
    meld FreeCities FreeCitiesPregmod 
    or just select these folders in meld's GUI.

5. All modders will be wery grateful if any, who make some changes to game, with .html file also post his/her resulting src folder tree.

6. For contributors to pregmod: you need to post yours version of src folder tree, not just produced FC.html !!! This html file can't be reverted to proper sources, and useless as contribution!