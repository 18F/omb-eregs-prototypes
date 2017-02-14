import codecs
import csv
from datetime import datetime
import json
from collections import namedtuple

docs = {}

Doc = namedtuple('Doc', ['name', 'num_req', 'start', 'end'])


def date_str(string):
    if string in ('NA', 'None specified'):
        return
    if string.startswith('FY '):
        year = int(string[len('FY '):])
        return year + '-10-01'
    else:
        return datetime.strptime(string, '%m/%d/%Y').date().isoformat()


with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        doc = row['policyNumber']
        if doc not in docs:
            docs[doc] = Doc(
                doc,
                0,
                date_str(row['policyIssuanceYear']),
                date_str(row['policySunset'])
            )

        if row['reqId'] != 'None':
            docs[doc] = docs[doc]._replace(num_req=docs[doc].num_req + 1)

data = []
for doc in docs.values():
    as_dict = {'id': doc.name, 'content': doc.name, 'start': doc.start}
    if doc.end:
        as_dict['end'] = doc.end
    else:
        as_dict['type'] = 'point'
    data.append(as_dict)
print("var data = {0};".format(json.dumps(data)))
