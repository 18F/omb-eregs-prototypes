import codecs
import csv
import json
from collections import defaultdict, namedtuple

import agencies


Req = namedtuple('Req', ['text', 'categories', 'agencies'])

reqs = []
agencies_by_category = {
    'cfo act agencies': [e.name for e in agencies.entities if e.cfo_act],
    'executive agencies': [e.name for e in agencies.entities],
    'federal cio council': [e.name for e in agencies.entities
                            if e.cio_council],
}
categories_by_agency = defaultdict(set)
for c, ags in agencies_by_category.items():
    for ag in ags:
        categories_by_agency[ag].add(c)
for key in categories_by_agency:
    categories_by_agency[key] = list(categories_by_agency[key])
entities = [e.name for e in agencies.entities]

with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        row_agencies = agencies.transform(row['Impacted Entity'])
        reqs.append(Req(
            row['reqText'].strip(),
            [a for a in row_agencies if a in agencies.categories],
            [a for a in row_agencies if a in entities]
        ))

print("""
<html>
<head>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="underscore-min.js"></script>
    <script src="filter_by_agency.js"></script>
    <script>
""")
print("categoriesByAgency = {0};".format(json.dumps(categories_by_agency)))
print("""
    </script>
    <style type="text/css">
        p:hover {
            border: 1px solid grey;
        }
    </style>
</head>
<body>
<select name="category">
<option value='None' data-agencies='[]'>None</option>
""")
for cat in agencies.categories:
    print("<option value='{0}' data-agencies='{1}'>{0}</option>".format(
        cat, json.dumps(agencies_by_category[cat])))
print("""
</select>
<select name="agency">
<option value='None'>None</option>
""")
for ent in entities:
    print("<option value='{0}'>{0}</option>".format(ent))
print("""
</select>
""")

markup = "<p data-categories='{0}' data-agencies='{1}' title='{2}'>{3}</p>"

for req in reqs:
    text = req.text.replace('\n', '<br />')
    print(markup.format(
        json.dumps(req.categories), json.dumps(req.agencies),
        ', '.join(req.categories + req.agencies) or 'None', text))

print("""
</body>
</html>
""")
