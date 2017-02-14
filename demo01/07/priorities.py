import codecs
import csv
import json
from collections import Counter


priorities = (
    ('must', 'will', 'require', 'need', 'responsible', 'shall',
     'not permitted', 'ensure', 'expected', 'direct'),
    ('should', 'encourage', 'support', 'promote'),
    ('may', 'can')
)
priority_names = ['Must', 'Should', 'May', 'No Priority']
actions = (
    'develop', 'establish', 'provide', 'submit', 'identify', 'report',
    'publish', 'oversee', 'evaluate', 'complete', 'account', 'use', 'send',
    'engage', 'sponsor', 'make'
)
definitions = (
    'include', 'exclude', 'classify',
)
groups = {
    'priority': {w for level in priorities for w in level},
    'action': actions,
    'definition': definitions
}


if __name__ == '__main__':
    verbs = Counter()

    with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            verbs.update(
                v.strip()
                for v_semi in row['verb'].lower().split(';')
                for v in v_semi.split(',')
                if v.strip() and v not in ('na', 'n/a')
            )

    covered = {'priority': 0, 'action': 0, 'definition': 0, 'other': 0}
    priority_types = [0, 0, 0]

    for verb, count in verbs.most_common():
        found = False
        for key, words in groups.items():
            if any(w in verb for w in words):
                covered[key] += count
                found = True
                break
        for level, words in enumerate(priorities):
            if verb in words:
                priority_types[level] += count
        if not found:
            covered['other'] += count

    data = {
        'labels': priority_names[:-1] + ['Action', 'Definition', 'Other'],
        'datasets': [{
            'data': priority_types + [
                covered['action'], covered['definition'], covered['other']],
            'backgroundColor': [
                'darkred', 'red', 'pink', 'blue', 'yellow', 'grey'],
        }]
    }
    print("var data = {0};".format(json.dumps(data)))
