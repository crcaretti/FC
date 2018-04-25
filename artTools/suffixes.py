#!/usr/bin/env python3

import sys
import re

svg = open(sys.argv[1]).read()
outfits = re.findall('(?<=")[^"]*Outfit_[^"]+', svg)
outfits = set(outfits)
#re_suffix = re.compile('(?<=Outfit_).+')
re_suffix = re.compile('(?<=Outfit_)[^_]+')
mapping = {o : re_suffix.search(o).group(0) for o in outfits}

suffixes = set(mapping.values())

for v in sorted(suffixes):
  print(v)
