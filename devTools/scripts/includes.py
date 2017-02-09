#!python

import sys
import os.path

FN = sys.argv[1]
OUT = sys.argv[2]
DIR = sys.argv[3]

def main():
    if not os.path.exists(FN):
        print >>sys.stderr, FN, 'not found'
        sys.exit(1)

    with open(FN, 'r') as fin:
        lines = fin.readlines()
        fin.close()
    fout = open(OUT, 'w')
    fout.write("".join(lines))

    # os.sep can be changed to \\ or / as appropriate
    # can also os.path.abspath() which will canonicalize

    pnames = []
    for path, subdirs, files in os.walk(DIR):
        for filename in files:
            if filename.endswith('.tw'):
                pathname = os.path.join(path, filename)
                if pathname != OUT:
                    pnames.append(pathname + '\n')

    fout.write("".join(sorted(pnames)))
    fout.close()

    return 0

if __name__ == '__main__':
    sys.exit(main())
