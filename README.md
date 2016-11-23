# Summary

RMS Titanic was a British passenger liner that sank in the North Atlantic Ocean in the early morning of 15 April 1912,
after colliding with an iceberg during her maiden voyage from Southampton to New York City. Of the 2,224 passengers
and crew aboard, more than 1,500 died, making it one of the deadliest commercial peacetime maritime disasters in
modern history.

The following database shows information from 891 of these passengers. It seems that the saying women first, worked. What do you think?

# Design

The general idea is to spatially visualize the numbers of survivors, dead, and gender at a glance.

In order to spatially visualize passengers, each of them must be represented in the view. Inspired by a Heat map composed of hexagons, each passenger is represented by a hexagon, varying in color what we want to represent: colors representing sex, reduction of brightness to represent the deaths or increase of brightness to represent survival. To make it easier for the user to understand, each hexagon has a caption, displayed by hovering over it, informing what is being represented (man, woman, survivor, etc.).

The simple spatial visualization already gives us an idea of ​​the proportions (eg number of women in relation to the number of men, etc.). However, using a table that summarizes the data avoids ambiguities. If, however, the hexagons appear inordinately on the map, it will be more difficult to perceive the totality of each group. It is the reason why hexagons were grouped as the characteristic one wishes to show (e.g. in the view by sex, all women appear one after another, for only after beginning the exhibition of the men).

# Feedback

* Feedback - titanic_v1.html:
    * no text informing what it means
    * include sex+survived option
    * on hover color incorrect

* Feedback - titanic_v2.html:
    * no text informing what it means
    * on hover color incorrect
    *  what colors mean?

* Feedback - titanic_v3.html:
    * what colors mean? include a legend on mouse hover.
    * include data table overview
    * include a question to audience

# Resources

* [http://bl.ocks.org/nbremer/6052814](http://bl.ocks.org/nbremer/6052814)