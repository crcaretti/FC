#!/usr/bin/env python3
import fileinput
import re
import sys

def myprint(*args):
    print(fileinput.filename() + ":",*args)

pattern = re.compile(r'(<<(\/?) *(if|for|else|switch|case)[^<>]*)')

linenumber = 0
tagfound = []
for line in fileinput.input():
    linenumber += 1
    for (whole,end,tag) in re.findall(pattern,line):
        if tag == "else" or tag == 'case':
            if len(tagfound) == 0:
                myprint("Found", tag, "but with no opening tag:")
                myprint("  ", linenumber,":", whole)
                exit(1)
            lasttag = tagfound[-1]
            if (tag == "else" and lasttag["tag"] != "if") or (tag == "case" and lasttag["tag"] != "switch"):
                myprint("Mismatched else: Opening tag was:")
                myprint("  ",lasttag["linenumber"],":", lasttag["whole"])
                myprint("But this tag was:")
                myprint("  ",linenumber,":", whole)
                exit(1)
        elif end != '/':
            tagfound.append({"whole": whole, "linenumber":linenumber,"tag":tag})
        else:
            if len(tagfound) == 0:
                myprint("Found closing tag but with no opening tag:")
                myprint("  ", linenumber,":", whole)
                exit(1)

            lasttag = tagfound.pop()
            if lasttag["tag"] != tag:
                myprint("Mismatched tag: Opening tag was:")
                myprint("  ",lasttag["linenumber"],":", lasttag["whole"])
                myprint("Closing tag was:")
                myprint("  ",linenumber,":", whole)
                exit(1)


