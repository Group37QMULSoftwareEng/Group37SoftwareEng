from flask import Flask
from application.controller.api import api

'''app init'''
app = Flask(__name__, static_folder='static', static_url_path='')

'''app secret'''
app.secret_key = "easy wallet"

"""register api router"""
app.register_blueprint(api, url_prefix='')

if __name__ == '__main__':
    app.run(port=4000, debug=True)
