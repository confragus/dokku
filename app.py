import os
from mycode import csv_json, cmc_flat, cmc_json
import requests

from flask import Flask, render_template, send_from_directory
from flask_cors import CORS

# Import question list

questions = csv_json('db/questionlist2.csv')

# web app

app = Flask(__name__, static_url_path='')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cmc')
def cmc():

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
   
    json_file = cmc_json(flat_file)
    
    return str(json_file)

@app.route('/chuck')
def chuck():
    return requests.get('http://api.icndb.com/jokes/random').json()['value']['joke']

@app.route('/memory')
def memory():
    return render_template('memory.html')

@app.route('/list')
def list():
    return render_template('list.html')

@app.route('/questionlist')
def questionlist():
    return str(questions)

@app.route('/sheep')
def sheep():
    return render_template('sheep.html')

@app.route('/ghibli')
def ghibli():
    return render_template('ghibli.html')

@app.route('/arith')
def arith():
    return render_template('arith.html')

@app.route('/timer')
def timer():
    return render_template('timer.html')

@app.route('/bricks')
def bricks():
    return render_template('bricks.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/js_quiz')
def js_quiz():
    return render_template('js_quiz.html')

@app.route('/jonoform')
def jonoform():
    return render_template('jonoform.html')

@app.route('/studybotquiz')
def studybotquiz():
    return render_template('studybotquiz.html')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 80.
    port = int(os.environ.get('PORT', 8000))
    app.run(host='127.0.0.1', port=port)