#!/bin/bash
 
#http://imgur.com/gallery/fL7Saxw
 
words=("Please help me." "I am so alone." \
"Tom arms my brothers" "Psssst" "Hey, Listen." \
"Kill all humans." "Don't ever leave me."\
"The hunger is overwelming" "Look over here" \
"Duck Duck Goose. You are it!" "Never gonna give you up.")
 
#get a chance to step away
sleep 15
 
while [ 1 = 1 ]
  do
    osascript -e "set volume 5"
    say "${words[$[RANDOM%${#words[@]}]]}" -v whisper -r 1.5
    sleep 30
done