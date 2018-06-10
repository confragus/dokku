import csv
import json

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