import codecs
import csv
import json
from collections import defaultdict

docs = defaultdict(set)

with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        doc = row['policyNumber']
        req = row['reqId']
        if req != 'None':
            docs[doc].add(req)

nodes = [{'id': doc, 'label': doc, 'color': 'red'} for doc in docs]
nodes.extend({'id': req, 'label': req, 'color': 'lightblue'}
             for reqs in docs.values() for req in reqs)

edges = [{'from': doc, 'to': req}
         for doc, reqs in docs.items()
         for req in reqs]

print("var data = {")
print("nodes: new vis.DataSet({0}),".format(json.dumps(nodes)))
print("edges: new vis.DataSet({0})".format(json.dumps(edges)))
print("};")
