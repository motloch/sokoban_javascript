num_levels = 105

def write_level_info(lvl):
    f.write(' //Level ' + str(lvl) + '\n [\n')

    dat = open('levels/' + str(lvl) + '.txt').readlines()[1:]
    cutted_dat = []

    #cut upper and lower edges
    for i in range(len(dat)):
      replaced_line = dat[i].replace('*', '').replace('\n','')
      if replaced_line != '':
        cutted_dat.append(dat[i].replace('\n', ''))

    #figure out how many to cut on the left side
    num_cut = 0
    cut_on = True
    while cut_on:
        for i in range(len(cutted_dat)):
            if cutted_dat[i][num_cut] != '*':
                cut_on = False
        if cut_on:
            num_cut += 1

    #cut
    for i in range(len(cutted_dat)):
        cutted_dat[i] = cutted_dat[i][num_cut:]

    #figure out how many to cut on the right side
    num_cut = 0
    cut_on = True
    while cut_on:
        for i in range(len(cutted_dat)):
            if cutted_dat[i][-num_cut-1] != '*':
                cut_on = False
        if cut_on:
            num_cut += 1

    #cut
    for i in range(len(cutted_dat)):
        cutted_dat[i] = cutted_dat[i][:-num_cut]

    width = len(cutted_dat[0])
    f.write('  ' + str(width) + ',\n')

    height = len(cutted_dat)
    f.write('  ' + str(height) + ',\n')

    currentPosition = 0
    for i in range(len(cutted_dat)):
        if ('@' in cutted_dat[i]) or ('+' in cutted_dat[i]):
            pos_guy = cutted_dat[i].find('@')
            if pos_guy != -1:
                currentPosition += pos_guy
            else:
                pos_guy_in = cutted_dat[i].find('+')
                currentPosition += pos_guy_in
            break
        else:
            currentPosition += width
    f.write('  ' + str(currentPosition) + ',\n')

    f.write('  [\n')

    for i in range(len(cutted_dat)):
      cutted_dat[i] = cutted_dat[i].replace(' ', "'floor' , ")
      cutted_dat[i] = cutted_dat[i].replace('*', "'floor' , ")
      cutted_dat[i] = cutted_dat[i].replace('#', "'wall'  , ")
      cutted_dat[i] = cutted_dat[i].replace('$', "'box'   , ")
      cutted_dat[i] = cutted_dat[i].replace('.', "'dock'  , ")
      cutted_dat[i] = cutted_dat[i].replace('@', "'guy'   , ")
      cutted_dat[i] = cutted_dat[i].replace('?', "'box_in', ")
      cutted_dat[i] = cutted_dat[i].replace('+', "'guy_in', ")
      f.write('  [' + cutted_dat[i][:-2] + '],\n') #ignore the last comma

    f.write('  ]\n')

    f.write(' ],\n')
    return

f =  open('levels.js', 'w')
f.write('level_info =\n[\n //Level 0\n [],\n')
for i in range(1, num_levels+1):
    write_level_info(i)
f.write(']')

