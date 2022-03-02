num_levels = 105

# How to translate from the txt encoding
dictionary = {
      ' ': "'floor' , ",
      '*': "'floor' , ",
      '#': "'wall'  , ",
      '$': "'box'   , ",
      '.': "'dock'  , ",
      '@': "'guy'   , ",
      '?': "'box_in', ",
      '+': "'guy_in', ",
    }

def write_level_info(lvl):
    """
    Read in the txt file with the level information and write it into the file f
    """
    f.write(' //Level ' + str(lvl) + '\n [\n')

    dat = open('levels/' + str(lvl) + '.txt').read().splitlines()[1:]

    # Get rid of the empty rows
    dat = [row for row in dat if row != '*' * len(dat[0])]

    # Get rid of the extra columns on the left, right
    while all([row[0] == '*' for row in dat]):
        dat = [row[1:] for row in dat]

    while all([row[-1] == '*' for row in dat]):
        dat = [row[:-1] for row in dat]

    # Get width, height and write them to file
    width = len(dat[0])
    height = len(dat)
    f.write('  ' + str(width) + ',\n')
    f.write('  ' + str(height) + ',\n')

    # Find starting positon (we index positions by single integer)
    currentPosition = 0
    for i in range(len(dat)):
        if ('@' in dat[i]) or ('+' in dat[i]):
            pos_guy = dat[i].find('@')
            if pos_guy != -1:
                currentPosition += pos_guy
            else:
                pos_guy_in = dat[i].find('+')
                currentPosition += pos_guy_in
            break
        else:
            currentPosition += width
    f.write('  ' + str(currentPosition) + ',\n')

    f.write('  [\n')

    # Write out the level
    for i in range(len(dat)):
      for k in dictionary:
        dat[i] = dat[i].replace(k, dictionary[k])
      f.write('  [' + dat[i][:-2] + '],\n') #ignore the last comma

    f.write('  ]\n')

    f.write(' ],\n')
    return

f =  open('levels.js', 'w')
f.write('level_info =\n[\n //Level 0\n [],\n')
for i in range(1, num_levels+1):
    write_level_info(i)
f.write(']')

