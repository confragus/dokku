import os
from mycode import csv_json, get_flat

from flask import Flask, render_template, send_from_directory

# Import question list

questions = csv_json('db/questionlist.csv')

# CMC

crypto_json = get_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&limit=0')

# web app

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cmc')
def cmc():
    return str(crypto_json)

@app.route('/chuck')
def chuck():
    return requests.get('http://api.icndb.com/jokes/random').json()['value']['joke']

@app.route('/memory')
def memory():
    return render_template('memory.html')

@app.route('/questionlist')
def questionlist():
    return str(questions)

@app.route('/sheep')
def sheep():
    return render_template('sheep.html')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port)