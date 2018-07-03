#!/usr/bin/env python3

'''
Application for "normalizing" SVGs

These problems are addressed:

* Inkscape notoriously copies class styles into the object definitions.
https://bugs.launchpad.net/inkscape/+bug/167937

* Inkscape uses labels on layers. Layers are basically named groups. 
  Inkscape does not sync the group id with the layer label.
  
Usage Example:
python3 inkscape_svg_fixup.py vector_source.svg
'''

import lxml.etree as etree
import sys

def fix(tree):
  # know namespaces
  ns = {
    'svg' : 'http://www.w3.org/2000/svg',
    'inkscape' : 'http://www.inkscape.org/namespaces/inkscape'
  }
  
  # find document global style definition
  # mangle it and interpret as python dictionary
  style_element = tree.find('./svg:style',namespaces=ns)
  style_definitions = style_element.text
  pythonic_style_definitions = '{'+style_definitions.\
  replace('\t.','"').replace('{','":"').replace('}','",').\
  replace('/*','#')+'}'
  styles = eval(pythonic_style_definitions)

  # go through all SVG elements
  for elem in tree.iter():
    if (elem.tag == etree.QName(ns['svg'], 'g')):
      # compare inkscape label with group element ID
      l = elem.get(etree.QName(ns['inkscape'], 'label'))
      if l:
        i = elem.get('id')
        if (i != l):
          print("Overwriting ID %s with Label %s..."%(i, l))
          elem.set('id', l)

    # clean styles (for easier manual merging)
    style_string = elem.get('style')
    if style_string:
      split_styles = style_string.strip('; ').split(';')
      styles_pairs = [s.strip('; ').split(':') for s in split_styles]
      filtered_pairs = [ (k,v) for k,v in styles_pairs if not (
        k.startswith('font-') or
        k.startswith('text-') or
        k.endswith('-spacing') or
        k in ["line-height", " direction", " writing", " baseline-shift", " white-space", " writing-mode"]
      )]
      split_styles = [':'.join(p) for p in filtered_pairs]
      style_string = ';'.join(sorted(split_styles))
      elem.attrib["style"] = style_string

    # remove all style attributes offending class styles
    s = elem.get('style')
    c = elem.get('class')
    if (c and s):
      s = s.lower()
      c = c.split(' ')[0] # regard main style only
      cs = ''
      if c in styles:
        cs = styles[c].strip('; ').lower()
      if (c not in styles):
        print("Object id %s references unknown style class %s."%(i,c))
      else:
        if (cs != s.strip('; ')):
          print("Style %s removed from object id %s differed from class %s style %s."%(s,i,c,cs))
        del elem.attrib["style"]

if __name__ == "__main__":
  input_file = sys.argv[1]
  tree = etree.parse(input_file)
  fix(tree)
  # store SVG into file (input file is overwritten)
  svg = etree.tostring(tree, pretty_print=True)
  with open(input_file, 'wb') as f:
    f.write('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'.encode("utf-8"))
    f.write(svg)
