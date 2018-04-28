#!/usr/bin/env python3

import sys
import re

def get(filename_svg):
    svg = open(filename_svg).read()
    outfits = re.findall('(?<=")[^"]*Outfit_[^"]+', svg)
    outfits = set(outfits)
    #re_suffix = re.compile('(?<=Outfit_).+')
    re_suffix = re.compile('(?<=Outfit_)[^_]+')
    mapping = {o : re_suffix.search(o).group(0) for o in outfits}
    suffixes = set(mapping.values())
    for v in sorted(suffixes):
        print(v)
    
def apply(filename_svg, filename_csv):
    pairs = [ tuple(l.strip().split(';')) for l in open(filename_csv).readlines() ]
    pairs = [ p for p in pairs if p[0] and p[1] and p[0] != p[1] ]
    pairs = [ ('_'+p[0],'_'+p[1]) for p in pairs ]
    with open(filename_svg) as f:
      svg = f.read()
      for p in pairs:
          svg = svg.replace(*p)
    open(filename_svg,'w').write(svg)

if __name__ == '__main__':
    if (len(sys.argv) == 2):
        get(sys.argv[1])
    elif (len(sys.argv) == 3):
        apply(sys.argv[1], sys.argv[2])
