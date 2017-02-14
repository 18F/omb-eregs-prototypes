from collections import defaultdict
import codecs
import csv
import json

by_type = defaultdict(set)
last_policy = None


with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        row_policy, row_type = row['policyNumber'], row['policyType']
        row_type = row_type.strip()
        if 'Memo' in row_type:
            row_type = 'Memo'
        if 'Circular' in row_type:
            row_type = 'Circular'
        if row_policy != last_policy:
            last_policy = row_policy
            by_type[row_type].add(last_policy)


nodes = [{'id': t, 'label': t, 'color': 'red'} for t in by_type]
nodes.extend({'id': pol, 'label': pol, 'color': 'lightblue'}
             for pols in by_type.values() for pol in pols)
edges = [{'from': t, 'to': pol}
         for t, pols in by_type.items() for pol in pols]

print("var data = {")
print("nodes: new vis.DataSet({0}),".format(json.dumps(nodes)))
print("edges: new vis.DataSet({0})".format(json.dumps(edges)))
print("};")
