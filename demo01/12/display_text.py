import codecs
import csv
from collections import namedtuple
import re

Root = namedtuple('Root', ['children'])
Policy = namedtuple('Policy', ['text', 'children'])
Section = namedtuple('Section', ['text', 'children'])
SubSection = namedtuple('SubSection', ['text', 'children'])
Req = namedtuple('Req', ['text', 'verbs', 'citations'])
root, policy, section, subsection = Root([]), None, None, None


def add_to_parent(nested):
    for parent in (subsection, section, policy, root):
        if parent is not None:
            parent.children.append(nested)
            break
    return nested


def clean(string):
    string = string.strip()
    if string not in ('NA', 'None', ''):
        return string


with codecs.open('data.csv', encoding='utf-8', errors='ignore') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        row_pol = clean(row['policyTitle'])
        row_sec = clean(row['policySection'])
        row_sub = clean(row['policySubSection'])
        row_req = clean(row['reqText'])
        row_verbs = [
            v.strip() for vs in row['verb'].split(';') for v in vs.split(',')
            if v.strip()
        ]
        row_cits = [c.strip() for c in row['citation'].split(';') if c.strip()]

        if not policy or policy.text != row_pol:
            policy, section, subsection = None, None, None
            if row_pol:
                policy = add_to_parent(Policy(row_pol, []))

        if not section or section.text != row_sec:
            section, subsection = None, None
            if row_sec:
                section = add_to_parent(Section(row_sec, []))

        if not subsection or subsection.text != row_sub:
            subsection = None
            if row_sub:
                subsection = add_to_parent(SubSection(row_sub, []))

        add_to_parent(Req(row_req, row_verbs, row_cits))


def strongify(match):
    return '<strong>{0}</strong>'.format(match.group(0))


def to_str(nested):
    return_val = ''
    if not isinstance(nested, (Root, Req)):
        return_val += "\n<p class='context'>{0}</p>\n".format(nested.text)
    if isinstance(nested, Req):
        text = nested.text
        text = text.replace('\n', '<br />')
        for verb in nested.verbs:
            if ' ' in verb:
                text = re.sub(verb, strongify, text, flags=re.IGNORECASE)
            else:
                text = re.sub(r'\b' + verb + r'\b', strongify, text,
                              flags=re.IGNORECASE)
        for cit in nested.citations:
            text = text.replace(
                cit, '<a href="#not-implemented">{0}</a>'.format(cit))
        return_val += "\n<p>{0}</p>\n".format(text)

    if not isinstance(nested, Req) and nested.children:
        return_val += '\n<ul>{0}</ul>\n'.format(''.join(
            '\n<li>{0}</li>\n'.format(to_str(child))
            for child in nested.children
        ))
    return return_val


if __name__ == '__main__':
    print("""
    <html>
    <head>
        <style type="text/css">
            .context {
    """)
    print("""
                color: lightgrey;
            }
            strong {
    """)
    print("""
                color: red;
                font-weight: bold;
            };
    """)
    print("""
        </style>
    </head>
    <body>
    {0}
    </body>
    </html>
    """.format(to_str(root)))
