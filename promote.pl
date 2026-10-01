#!/usr/bin/perl -0pi
# usage: perl promote.pl <slug> site/index.html
# moves a card from the desktop section into the browser section and makes play/ its main button
BEGIN { $s = shift @ARGV }
s{(<article class="card">(?:(?!</article>).)*?href="\Q$s\E/"(?:(?!</article>).)*?</article>\n)}{}s or die "card $s not found\n";
($c = $1) =~ s{<a class="btn" href="\Q$s\E/">Details</a>.*?</div></div></article>}{<a class="btn" href="$s/">Details</a><a class="btn play" href="$s/play/">▶ Play</a></div></div></article>}s;
s{</div>\n(<h2 class="sec">// MODS)}{$c</div>\n$1};
