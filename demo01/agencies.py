from collections import Counter, defaultdict, namedtuple
import codecs
import csv

Entity = namedtuple('Entity', ['name', 'agency', 'cfo_act', 'branch',
                               'cio_council'])


aliases = {
    'all cfo act agencies': 'cfo act agencies',
    'all agencies': 'executive agencies',
    'cfo act agencies [ref. req. 5.01]': 'cfo act agencies',
    'all cfo-act agencies': 'cfo act agencies',
    'agency cios': 'executive agencies',
    'agencies': 'executive agencies',
    'all cfo act agencies - cio': 'cfo act agencies',
    'federal government': 'executive agencies',
    'department of commerce': 'doc',
    'sslc': 'cfo act agencies',
    'department of homeland security': 'dhs',
    'all cfo act agencies - cios': 'cfo act agencies',
    'gsa ogp': 'gsa',
    'all government offices': 'executive agencies',
    'general services administration': 'gsa',
    'federal chief information officers council (federal cio council)':
        'federal cio council',
    'national archives': 'nara',
    'office of personnel management': 'opm',
}
categories = [
    'cfo act agencies', 'executive agencies', 'federal cio council'
]
misparse = [
    'development expenditures', 'records administration', 'congress',
]
entities = [
    Entity('gsa', True, True, 'executive', True),
    Entity('omb', False, False, 'executive', True),
    Entity('doc', True, True, 'executive', True),
    Entity('dhs', True, True, 'executive', True),
    Entity('dod', True, True, 'executive', True),
    Entity('state', True, True, 'executive', True),
    Entity('nara', True, False, 'executive', True),
    Entity('usda', True, True, 'executive', True),
    Entity('doi', True, True, 'executive', True),
    Entity('fema', True, True, 'executive', True),
    Entity('doe', True, True, 'executive', True),
    Entity('nsf', True, True, 'executive', True),
    Entity('dot', True, True, 'executive', True),
    Entity('doj', True, True, 'executive', True),
    Entity('nasa', True, True, 'executive', True),
    Entity('hhs', True, True, 'executive', True),
    Entity('epa', True, True, 'executive', True),
    Entity('hud', True, True, 'executive', True),
    Entity('opm', True, True, 'executive', True),
    Entity('ofpp', False, False, 'executive', False),
    Entity('treasury', True, True, 'executive', True),
]


def transform(text):
    row_agencies = [
        a.strip().lower()
        for a_semi in text.split(';')
        for a_comma in a_semi.split(',')
        for a in a_comma.split(' and ')
        if a.strip() and a != 'NA'
    ]
    row_agencies = [aliases.get(name, name) for name in row_agencies]
    row_agencies = [name for name in row_agencies if name not in misparse]
    return row_agencies


if __name__ == '__main__':
    agency_counter = Counter()
    by_agency = defaultdict(set)

    with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            row_agencies = transform(row['Impacted Entity'])
            for agency in row_agencies:
                by_agency[agency].add(row['reqId'])
            agency_counter.update(row_agencies)

    done = 0
    total = sum(agency_counter.values())
    for mapping in categories + [e.name for e in entities]:
        done += agency_counter[mapping]
        print(mapping, ":", agency_counter[mapping], "/", total, "=",
              agency_counter[mapping]/total)
        del agency_counter[mapping]
    print("processed", done, "/", total, "=", done/total)
    print()
    for agency, count in agency_counter.most_common(20):
        print(agency, count)
