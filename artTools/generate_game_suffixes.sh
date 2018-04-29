#!/bin/bash

# This script reads all possible values of $slave.clothes as mentioned by the documentation.
# This script uses the actual implementation of the JS clothing2artSuffix function as defined in src/art/vector/Helper_Functions.tw
# This script outputs suffixes to be used in the SVG naming scheme
# This script is meant to be executed at the project root directory.
# This script depends on bash, grep, sed, paste and nodejs (so best executed on Linux, I guess)

( 
  echo 'var window = {};'
  grep -v '^:' src/art/vector/Helper_Functions.tw
  echo -n 'Array('
  sed '/^clothes:/,/:/!d' "slave variables documentation - Pregmod.txt" | grep '"' | paste -sd,
  echo ').forEach(v => {console.log(window.clothing2artSuffix(v));});' 
) | nodejs
