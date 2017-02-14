import codecs
import csv
import json
from collections import defaultdict

keywords = defaultdict(set)

with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    headers = [hd for hd in reader.fieldnames
               if '(Keywords)' in hd and hd != 'Other (Keywords)']
    for row in reader:
        if row['reqId'] == 'None':
            continue

        for hd in (hd for hd in headers if row[hd]):
            keywords[hd].add(row['reqId'])

        other_keywords = row['Other (Keywords)'].split(',')
        other_keywords = [kw.strip() for kw in other_keywords if kw.strip()]
        for kw in other_keywords:
            keywords[kw].add(row['reqId'])

nodes = [{'id': kw, 'label': kw, 'color': 'red'} for kw in keywords]
reqs = {req for reqs in keywords.values() for req in reqs}
nodes.extend({'id': req, 'label': req, 'color': 'lightblue'} for req in reqs)

edges = [{'from': kw, 'to': req}
         for kw, reqs in keywords.items()
         for req in reqs]

print("var data = {")
print("nodes: new vis.DataSet({0}),".format(json.dumps(nodes)))
print("edges: new vis.DataSet({0})".format(json.dumps(edges)))
print("};")
