import requests

URL='https://tidy-bird-57.localtunnel.me/api/donor/signup'
params = { 'fname' : 'Kiran',
    'lname' : 'A K',
    'dob' : '11-07-1999',
    'email' : 'codered.blut@gmail.com',
    'password' : '1234567',
    'phone' : '1234567890',
    'addr' : 'asd',
    'bg': 'aa',
    'bgc' : 'zxc',}
r = requests.post(url = URL,data = params)
print(r.text)
