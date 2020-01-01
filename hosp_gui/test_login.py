import requests

URL='https://sharp-skunk-94.localtunnel.me/api/hospitals/login'
params = {'email' : 'codered.blut@gmail.com',
    'password' : '1234567' }
r = requests.post(url = URL,data = params)
data = r.json()
print('name : ',data['name'])
print('id : ',data['_id'])
