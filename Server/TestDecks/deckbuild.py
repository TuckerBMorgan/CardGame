import sys

if len(sys.argv) == 1:
    print("you must have at least one card")
elif len(sys.argv) == 2:
    f = open('testdeck.js', 'w')
    f.write("exports.deck = [\n")
    for x in range(0, 30):
        f.write("\t\t\"");
        f.write(sys.argv[1]);
        f.write("\",\n");
    f.write("];");
#if you give me two cards I make a deck of 15 of each 
#elif len(sys.argv) == 3:
#    f = open('testdeck.js', 'w')
#    f.write("exports.deck = [\n")
#        for x in range(0, 15):
#            f.write("")