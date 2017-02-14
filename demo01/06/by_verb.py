from collections import defaultdict
import codecs
import csv
import json

by_verb = defaultdict(set)


with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        verbs = [
            v.strip()
            for v_semi in row['verb'].lower().split(';')
            for v in v_semi.split(',')
            if v.strip() and v not in ('na', 'n/a')
        ]
        for v in verbs:
            by_verb[v].add(row['reqId'])


req_set = {reqId for reqs in by_verb.values() for reqId in reqs}
nodes = [{'id': v, 'label': v, 'color': 'red'} for v in by_verb]
nodes.extend({'id': req, 'label': req, 'color': 'lightblue'}
             for req in req_set)
edges = [{'from': v, 'to': req}
         for v, reqs in by_verb.items() for req in reqs]

print("var data = {")
print("nodes: new vis.DataSet({0}),".format(json.dumps(nodes)))
print("edges: new vis.DataSet({0})".format(json.dumps(edges)))
print("};")
