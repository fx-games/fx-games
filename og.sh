#!/bin/sh
# Render 1200×630 link-preview cards (site/og.png, site/<game>/img/og.png) from the screenshots.
set -e
cd "$(dirname "$0")/site"
FONT=~/Library/Fonts/DepartureMonoNerdFontMono-Regular.otf
card() { # shot title cta out
  magick -size 1200x630 xc:'#0b0b10' \
    \( "$1" -resize 820x630^ -gravity center -extent 820x630 \) -gravity west -composite \
    \( -gravity northwest -size 330x220 -pointsize 50 -background none -fill '#ffb000' -font "$FONT" caption:"$2" \) -gravity northwest -geometry +840+40 -composite \
    \( -gravity northwest -size 330x200 -pointsize 28 -background none -fill '#e8e6df' -font "$FONT" caption:"${5:- }" \) -gravity northwest -geometry +840+270 -composite \
    \( +size -background "#ffb000" -fill '#0b0b10' -font "$FONT" -pointsize 30 label:"$3" -trim +repage -bordercolor "#ffb000" -border 24x16 \) -gravity southwest -geometry +840+40 -composite \
    "$4"
}
# home card: 2×2 grid of four games
magick contractor/img/shot2.png legacy/img/shot1.png terminal-assassin/img/shot2.png janus-station/img/shot1.png \
  -resize 410x315^ -gravity center -extent 410x315 \( -clone 0,1 +append \) \( -clone 2,3 +append \) -delete 0-3 -append /tmp/og-home.png
card /tmp/og-home.png "FELIX' UNFINISHED GAMES" "PLAY NOW ›" og.png "Retro RPGs and roguelikes you can play in your browser"
for d in */; do
  d=${d%/}
  shot=$(ls $d/img/shot*.png 2>/dev/null | head -1); [ -n "$shot" ] || shot=contractor/img/shot2.png
  [ -d $d/play ] && cta="PLAY NOW ›" || cta="READ MORE ›"
  title=$(sed -n 's:.*<h1>\(.*\)</h1>.*:\1:p' $d/index.html | sed 's/&amp;/\&/g' | head -1)
  mkdir -p $d/img; card "$shot" "$title" "$cta" $d/img/og.png
done
