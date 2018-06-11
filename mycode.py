import csv
import json
import requests
from flatten_json import flatten

def cmc_flat(API):

    # flatten cmc version 2 api

    raw_file = requests.get(API).json()['data']
   
    flat_file = []

    for key, value in raw_file.items():
        flat_file.append(flatten(raw_file[key]))

    sort_file = sorted(flat_file, key=lambda k: k['rank']) 

    json_file = json.dumps(sort_file, sort_keys=True, indent=4, separators=(',', ': '), skipkeys=True)

    return json_file

def csv_dict(filename):

    # csv to dictionary

    with open(filename) as f:
        reader = csv.reader(f, skipinitialspace=True)
        header = next(reader)
        a = [dict(zip(header, map(str, row))) for row in reader]
    return a

def csv_json(file):

    # csv to dictionary

    csv_rows = []
    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)
        title = reader.fieldnames
        for row in reader:
            csv_rows.extend([{title[i]:row[title[i]] for i in range(len(title))}])
    return json.dumps(csv_rows, sort_keys=False, indent=4, separators=(',', ': '))