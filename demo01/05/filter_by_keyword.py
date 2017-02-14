import codecs
import csv
import json
from collections import namedtuple


Req = namedtuple('Req', ['text', 'keywords'])

reqs = []
keywords, others = set(), set()

with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    headers = [hd for hd in reader.fieldnames
               if '(Keywords)' in hd and hd != 'Other (Keywords)']
    keywords.update(headers)
    for row in reader:
        if row['reqId'] == 'None':
            continue

        other_kws = [kw.strip() for kw in row['Other (Keywords)'].split(',')
                     if kw.strip()]
        others.update(other_kws)
        reqs.append(Req(
            row['reqText'].strip(),
            [hd for hd in headers if row[hd]] + other_kws
        ))

print("""
<html>
<head>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="underscore-min.js"></script>
    <script src="filter_by_keyword.js"></script>
    <style type="text/css">
        p:hover {
            border: 1px solid grey;
        }
    </style>
</head>
<body>
<select name="keywords" multiple>
""")
for kw in sorted(keywords):
    print("<option value='{0}'>{0}</option>".format(kw))
print('<optgroup label="Other">')
for o in sorted(others):
    print("<option value='{0}'>{0}</option>".format(o))
print("""
</optgroup>
</select>
""")

markup = "<p data-keywords='{0}' title='{1}'>{2}</p>"

for req in reqs:
    text = req.text.replace('\n', '<br />')
    print(markup.format(
        json.dumps(req.keywords), ', '.join(req.keywords) or 'None', text))

print("""
</body>
</html>
""")
