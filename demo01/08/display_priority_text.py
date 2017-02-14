from collections import namedtuple
import codecs
import csv
import re

from priorities import groups, priorities, priority_names


Words = namedtuple('Words', ['priorities', 'actions', 'definitions', 'other'])
Req = namedtuple('Req', ['priority', 'text', 'words'])
colors = {'priority': 'red', 'action': 'blue', 'definition': 'green',
          'other': 'grey'}


def clean(string):
    string = string.strip()
    if string not in ('NA', 'None', ''):
        return string


def to_priority(verb_str):
    for idx, level in enumerate(priorities):
        if any(w in verb_str for w in level):
            return idx
    return len(priorities)


def in_words(verbs, words):
    for verb in verbs:
        if any(word in verb for word in words):
            yield verb


def replace_verbs(text, verbs, transform):
    for verb in verbs:
        if ' ' in verb:
            regex = re.escape(verb)
        else:
            regex = r'\b' + re.escape(verb) + r'\b'
        text = re.sub(regex, transform, text, flags=re.IGNORECASE)
    return text


reqs = []


with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        verb_str = clean(row['verb'].lower())
        priority = to_priority(verb_str) if verb_str else len(priorities)

        if verb_str:
            verbs = {
                v.strip()
                for v_semi in verb_str.split(';')
                for v in v_semi.split(',')
                if v.strip() and v not in ('na', 'n/a')
            }
            priority_words = set(in_words(verbs, groups['priority']))
            actions = set(in_words(verbs, groups['action']))
            definitions = set(in_words(verbs, groups['definition']))
            words = Words(priority_words, actions, definitions,
                          verbs - priority_words - actions - definitions)
        else:
            words = Words(set(), set(), set(), set())

        reqs.append(Req(priority, clean(row['reqText']), words))


print("""
<html>
<head>
    <style type="text/css">
        p { margin-left: 2em; }
""")
for key, color in colors.items():
    print(""".{0} {{
            color: {1};
            font-weight: bold;
    }}
    """.format(key, color))
print("""
    </style>
</head>
<body>
""")

last_priority = None
for req in sorted(reqs):
    if last_priority != req.priority:
        print("<h2>" + priority_names[req.priority] + "</h2>")
        last_priority = req.priority
    text = req.text.strip().replace('\n', '<br />')
    text = replace_verbs(
        text, req.words.priorities,
        lambda match: '<span class="priority">{0}</span>'.format(
            match.group(0))
    )
    text = replace_verbs(
        text, req.words.actions,
        lambda match: '<span class="action">{0}</span>'.format(match.group(0))
    )
    text = replace_verbs(
        text, req.words.definitions,
        lambda match: '<span class="definition">{0}</span>'.format(
            match.group(0))
    )
    text = replace_verbs(
        text, req.words.other,
        lambda match: '<span class="other">{0}</span>'.format(match.group(0))
    )
    text = '<p>{0}</p>'.format(text)
    print(text)

print("""
</body>
</html>
""")
