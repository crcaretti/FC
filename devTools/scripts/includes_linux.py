# In loving memory of Benis.

import subprocess
import sys
import os.path

FN = './src/config/start.tw'

def main():
    if not os.path.exists(FN):
        print >>sys.stderr, FN, 'not found'
        sys.exit(1)
    lines = []
    included = False
    drop = False
    with open(FN, 'r') as f:
        for l in f:
            if drop and l.startswith('::'):
                drop = False
            if not drop:
                lines.append(l)
            if l.startswith(':: StoryIncludes'):
                drop = True
                included = True
                found = subprocess.check_output(["find", ".", "-name", "*.tw", "-print0"]).split('\0')
                found.sort()
                lines += [x+'\n' for x in found if x != './src/config/start.tw']

    with open(FN, 'w') as f:
        for l in lines:
            f.write(l)

    print >>sys.stderr, 'Include list updated'
    return 0

if __name__ == '__main__':
    sys.exit(main())
