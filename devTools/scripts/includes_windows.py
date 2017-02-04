# Add all *.tw files (excluding start.tw) to start.tw

# Yes this is a pile of shit. The original includes.py doesn't work on Windows.
# I will clean it up eventually (TM).

import os
import sys

f = open("./src/config/start.tw","r+")
d = f.readlines()
f.seek(0)
for i in d:
    if '.tw' not in i:
        f.write(i)
f.truncate()
f.close()

with open("./src/config/start.tw", "a") as a:
    for path, subdirs, files in os.walk(r'./src'):
       for filename in files:
          if filename.endswith('.tw'):
             if not filename.endswith('start.tw'):
                f = os.path.join(path, filename)
                f = f.replace('\\','/').replace('.tw','.tw\n')
                a.write(str(f))
