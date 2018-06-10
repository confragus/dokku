import os
from mycode import csv_json

from flask import Flask

# csv to json written

questions = csv_json('db/questionlist.csv')

# web app

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello!'

@app.route('/questionlist')
def questionlist():
    return str(questions)

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port)