convert $(for ((a=18; a<670; a++)); do printf -- "-delay 4 %s_download.png " $a; done;) result.gif
