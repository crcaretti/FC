#!/bin/bash
# Check for missing right angle bracket: <</if>
git grep "<</[^>]*>[^>]" -- 'src/*'
git grep "<<[^>]*>[^<>]*$" -- 'src/*'
# Check for missing left angle bracket: </if>>
git grep "[^<]</[^<>]*>>" -- 'src/*'
# Check for accidental assignment.  e.g.:   <<if $foo = "hello">>
git grep "<<[ ]*if[^>=]*[^><\!=]=[^=][^>]*>>" -- 'src/*'
# Check for missing ".  e.g.:   <<if $foo = "hello>>
git grep "<<[^\"<>]*\"[^\"<>]*>>" -- 'src/*'
# Check for colors like: @@color:red   - should be @@.red
git grep -e "@@color:" --and --not -e  "@@color:rgb([0-9 ]\+,[0-9 ]\+,[0-9 ]\+)" -- "src/*"
# Check for missing $ in activeSlave or PC
git grep "<<[ ]*[^\$><_\[]*\(activeSlave\|PC\)[.]"  -- "src/*"
# Check for closing bracket without opening bracket.  e.g.:  <<if foo)>>      (but  <<case "foo")>>   is valid, so ignore those
git grep -e "<<[ a-zA-Z]\+[^()<>]*)" --and --not -e "<< *case"  -- "src/*"
# Check for opening bracket without closing bracket.  e.g.:  <<if (foo>>
git grep -e "<<[ a-zA-Z]\+([^()<>]*>>" -- "src/*"
# Check for two closing brackets but one opening bracket.  e.g.:  <<if (foo))>>
git grep -e "<<[ a-zA-Z]\+[^()<>]*([^()]*)[^()]*)[^()<>]*>>"  -- "src/*"
# Check for one closing bracket but two opening brackets.  e.g.:  <<if ((foo)>>
git grep -e "<<[ a-zA-Z]\+[^()<>]*([^()]*([^()]*)[^()<>]*>>"  -- "src/*"
# Check for missing >>.  e.g.:   <<if $foo
git grep "<<[^<>]*[^,\"\[{]$" -- 'src/*'
# Check for wrong capitilization on 'activeslave' and other common typos
git grep -e "\$act" --and --not -e "\$\(activeSlave\|activeArcology\|activeStandard\|activeOrgan\|activeLimbs\)" -- "src/*"
git grep  "\(csae\|[a-z] She \|attepmts\)" -- 'src/*'
