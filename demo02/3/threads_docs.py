import json
import re
from datetime import date
from enum import Enum, unique


@unique
class Priority(Enum):
    must = 'Must'
    should = 'Should'
    may = 'May'


data = {
    '73.01': ('All agencies', Priority.should, 'send', 'SAO report',
              'to PRMD@nara.gov', date(2014, 1, 31)),
    '73.02': ('All agencies', Priority.must, 'send', 'RMSA spreadsheet',
              'to rmselfassessment@nara.gov', date(2014, 1, 31)),
    '73.03': ('All agencies', Priority.should, 'reaffirm or designate',
              'new SAO', 'by sending their information to PRMD@nara.gov',
              date(2013, 11, 15)),
    '74.03': ('CFO Act agency heads', Priority.must, 'designate', 'SSAO',
              'by sending the proposed their contact info to OMB',
              date(2013, 1, 15)),
    '74.04': ('SSLC', Priority.must, 'meet', None, None, 'regularly'),
    '74.05': ('SSLC', Priority.must, 'submit', 'set of recommendations',
              'to OMB', date(2013, 3, 1)),
    '74.06': ('SSLC', Priority.must, 'promote',
              'sound strategic sourcing practices', 'within their agencies',
              None),
    '74.07': ('SSLC', Priority.must, 'establish', 'internal sourcing council',
              None, None),
    '74.08': ('GSA', Priority.must, 'implement',
              'at least five new strategic sourcing solutions',
              'in consulation with the SSLC', 'FY 2013 and FY 2014'),
    '74.09': ('GSA', Priority.must, 'increase',
              'transparency of prices paid by agency officials', None, None),
    '74.10': ('GSA', Priority.must, 'promulgate',
              'requirements for SSI managed commodities', None, 'as needed'),
    '74.11': ("CFO Act agencies' vehicles", Priority.must, 'reflect',
              'input from agency users', None, None),
    '74.12': ("CFO Act agencies' vehicles", Priority.must, 'ensure',
              'the Federal government gets credit for all vehicle sales', None,
              None),
    '74.13': ("CFO Act agencies' vehicles", Priority.must, 'include',
              'tiered pricing, or other appropriate strategies', None, None),
    '74.14': ("CFO Act agencies' vehicles", Priority.must, 'require',
              'sufficient pricing, usage, and performance data',
              'from vendors', None),
    '74.15': ("CFO Act agencies' vehicles' contract administration plan",
              Priority.must, 'include', 'active commodity management',
              'by the executive agent', None),
    '74.16': ("CFO Act agencies' vehicles' contract administration plan",
              Priority.must, 'include',
              'monitoring of vendor performance and pricing changes',
              'by the executive agent', None),
    '74.17': ("CFO Act agencies' strategic sourcing opportunities",
              Priority.must, 'seek to increase',
              'participation by small business', None, None),
    '74.18': ("CFO Act agencies' proposed strategic sourcing agreements",
              Priority.must, 'baseline', 'small business use',
              'under current strategies', None),
    '74.19': ("CFO Act agencies' proposed strategic sourcing agreements",
              Priority.must, 'set',
              'goals to meet or exceed baseline participation',
              'under the new strategic sourcing vehicles', None)
}

tag_re = re.compile(r'\[[^\]]*\]')


def replace_tag(match):
    reqs, class_name, text = match.group(0)[1:-1].split(':')
    reqs = reqs.split(',')
    return "<span class='tag {0}' data-reqs='{1}'>{2}</span>".format(
          class_name, json.dumps(reqs), text)


def print_doc(num):
    with open('threads_docs/{0}.txt'.format(num)) as doc:
        for line in doc:
            line = tag_re.sub(replace_tag, line)
            line = line.replace('\t', '&nbsp;'*8)
            print('<p class="text">{0}</p>'.format(line))


if __name__ == '__main__':
    print("""
<html>
<head>
    <style type="text/css">
        .who, .blur .who.unblur {
            color: #00B;
        }
        .priority, .blur .priority.unblur {
            color: #B00;
            font-weight: bold;
        }
        .action, .blur .action.unblur {
            color: #B0B;
        }
        .obj, .blur .obj.unblur {
            color: #0B0;
        }
        .how, .blur .how.unblur {
            color: #BB0;
            font-style: italic;
        }
        .when, .blur .when.unblur {
            color: #0BB;
        }
        .blur, .blur .who, .blur .priority, .blur .action, .blur .obj, .blur .how, .blur .when {
            color: #BBB;
        }
        .req-container {
            border: 1px solid black;
            position: fixed;
            background: white;
            padding: 10px;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="underscore-min.js"></script>
    <script src="threads_docs.js"></script>
</head>
<body>
    """)
    print('<div class="req-container">')
    for req_id, (who, priority, action, obj, how, when) in data.items():
        print('<div class="req" data-req-id="{0}">'.format(req_id))
        print("<span class='who'>{0}</span>".format(who))
        print("<span class='priority'>{0}</span>".format(priority.name))
        print("<span class='action'>{0}</span>".format(action))
        if obj:
            print("<span class='obj'>{0}</span>".format(obj))
        if how:
            print("<span class='how'>{0}</span>".format(how))
        if isinstance(when, date):
            print("by <span class='when'>{0}</span>".format(when.isoformat()))
        elif when:
            print("<span class='when'>{0}</span>".format(when))
        print("</div>")
    print('</div>')
    print_doc(73)
    print('<hr />')
    print_doc(74)
    print("""
</body>
</html>
    """)
