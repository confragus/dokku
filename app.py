import os
from mycode import csv_json, cmc_flat, cmc_json

from flask import Flask, render_template, send_from_directory

# Import question list

questions = csv_json('db/questionlist.csv')

# web app

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cmc')
def cmc():
    # CMC

    flat_file = []
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=101', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=201', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=301', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=401', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=501', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=601', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=701', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=801', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=901', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=1001', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=1101', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=1201', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=1301', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=1401', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=1501', flat_file)
    flat_file = cmc_flat('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&start=1601', flat_file)

    json_file = cmc_json(flat_file)
    
    return str(json_file)

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

@app.route('/ghibli')
def ghibli():
    return render_template('ghibli.html')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 8000.
    port = int(os.environ.get('PORT', 8000))
    app.run(host='127.0.0.1', port=port)