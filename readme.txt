Common problems:

How do I start the game?
-Run the compile file, go to folder "bin", click the "FC_Pregmod" and play. (Recommendation: Drag it into incognito mode)

I get an error on gamestart.
-clear cookies

I can't save more than once or twice.
-Known issue caused by sugarcube level changes. Save to file doesn't have this problem and will likely avoid the first problem as well.

I wish to report a sanityCheck issue.
-Great, however a large majority of the results are false positives coming from those specific sections being split over several lines in the name of readability and git grep's intentionally (http://git.661346.n2.nabble.com/bug-git-grep-P-and-multiline-mode-td7613900.html ) lacking support for multiline. An Attempt to add -Pzl (https://gitgud.io/pregmodfan/fc-pregmod/merge_requests/2108 ) created a sub condition black hole. What follows are examples of common false positives that can safely be ignored;

	[MissingClosingAngleBracket]src/art/vector/Generate_Stylesheet.tw:11:<<print "<style>."+_art_display_class+" {
		<<print "<style>."+_art_display_class+" {
    position: absolute;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
		}


	[MissingClosingAngleBrackets]src/pregmod/widgets/economyWidgets.tw:10:		<<run
		<<run
			_b.whoreIncome = (def _b.whoreIncome) ? _b.whoreIncome : 0;
			_b.rep = (def _b.rep) ? _b.rep : 0;
			_b.whoreCosts = (def _b.whoreCosts) ? _b.whoreCosts : 0;
			_b.adsIncome = (def _b.adsIncome) ? _b.adsIncome : 0;
			_b.maintenance = (def _b.maintenance) ? _b.maintenance : 0;
			_b.adsCosts = (def _b.adsCosts) ? _b.adsCosts : 0;
			_b.totalIncome = (def _b.totalIncome) ? _b.totalIncome : 0;
			_b.totalExpenses = (def _b.totalExpenses) ? _b.totalExpenses : 0;
			_b.profit = (def _b.profit) ? _b.profit : 0;
		>>

	[MissingOpeningBracket2]src/uncategorized/RESS.tw:1893:			<<set _possibleDrugs.push({type: "dick", text: "peni<<s>> enhan<<c>>ement? I know I'm a <<s>>e<<x>> <<s>>lave and it'<<s>> my pla<<c>>e to get fucked, but when I do get to do a girl, <<Master>>, I want to <<if canSee($activeSlave)>><<s>>ee a little fear in her eye<<s>><<else>>feel her a<<ss>> clench in fear<</if>>."})>>
		<<set _possibleDrugs.push({type: "dick", text: "peni<<s>> enhan<<c>>ement? I know I'm a <<s>>e<<x>> <<s>>lave and it'<<s>> my pla<<c>>e to get fucked, but when I do get to do a girl, <<Master>>, I want to <<if canSee($activeSlave)>><<s>>ee a little fear in her eye<<s>><<else>>feel her a<<ss>> clench in fear<</if>>."})>>

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
    Not supported directly (I don't have access to Mac for testing).
    But you can use linux compilation script if you download tweego for mac from here: https://bitbucket.org/tmedwards/tweego/downloads/ and replace linux executable with mac executable in ./devTools/tweeGo/ folder. This is not tested though, so be warned.

4. Simple comparing and merging with original FC:

    Use meld tool. Place folder FreeCities (original FC sources tree) near FreeCitiesPregmod (this sources tree) and use command:
    meld FreeCities FreeCitiesPregmod
    or just select these folders in meld's GUI.

5. All modders will be very grateful if anyone who makes some changes to game with .html file also post his/her resulting src folder tree.

6. For contributors to pregmod: if you don't use git, then you need to post your version of src folder tree, not just produced FC_pregmod.html file!!! This html file can't be reverted to proper sources, and useless as contribution!

7. Git workflow:
    - Master branch is pregmod-master. Only Pregmodder can add something to it directly. Always contain his last public changes.
    - pregmod-dev - branch with experimental code mainly by pregmodfan.
    - Any contributions will be placed in separate branches like pregmod-mod-<something> (if it's ready to merge with master complete feature/mod) or pregmod-contrib-<something> if it's partial work until contributions is reviewed.

    Typical cycle with git:
	1. Make account on gitgud if you don't have usable one.
	2. Fork main repository through gitgud interface. (Or pull changes from main repo if you already have fork.)
	3. Clone your fork to local machine with git client (Or pull changes if already cloned.)
	4. Make you changes as you like, commit, and push result into your forked repository (with git client).
	5. Make merge request through gitgud interface.
