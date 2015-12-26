#!/bin/bash
FILES=./*.less
for f in $FILES
do
  less2sass $f ${f%.*}.scss
done