import sys

fname = sys.argv[1]   # getting passed args

mname = input() # getting stdin input
lname = input()

# you can do different kinds of operations
fullname = fname +' '+mname+' '+lname

print ('python'+sys.version)
print('<h2>Output from python</h2>') 
print('<h3><i>'+fullname.upper()+'</i></h3>')