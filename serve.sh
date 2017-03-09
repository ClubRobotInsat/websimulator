#!/bin/bash
cd dist
python2.7 -m SimpleHTTPServer &
firefox localhost:8000 &
cd ..
