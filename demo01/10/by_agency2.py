from collections import Counter, defaultdict
import codecs
import csv
import json

import agencies

agency_counts = Counter()
by_agency = defaultdict(set)


with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        row_agencies = agencies.transform(row['Impacted Entity'])
        for agency in row_agencies:
            by_agency[agency].add(row['reqId'])
        agency_counts.update(row_agencies)


for agency, count in agency_counts.items():
    if count < 5:
        del by_agency[agency]


req_set = {reqId for reqs in by_agency.values() for reqId in reqs}
nodes = [{'id': ag, 'label': ag, 'color': 'red'} for ag in by_agency]
nodes.extend({'id': req, 'label': req, 'color': 'lightblue'}
             for req in req_set)
edges = [{'from': ag, 'to': req}
         for ag, reqs in by_agency.items() for req in reqs]

print("var data = {")
print("nodes: new vis.DataSet({0}),".format(json.dumps(nodes)))
print("edges: new vis.DataSet({0})".format(json.dumps(edges)))
print("};")
