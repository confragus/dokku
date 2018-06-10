import os
from mycode import csv_json

from flask import Flask, render_template, send_from_directory

# csv to json written

questions = csv_json('db/questionlist.csv')

# web app

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sheep')
def sheep():
    return render_template('sheep.html')

@app.route('/memory')
def memory():
    return render_template('memory.html')

@app.route('/questionlist')
def questionlist():
    return str(questions)

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port)