import re
from datetime import date
from enum import Enum, unique

import attr


@unique
class Priority(Enum):
    must = 'Must'
    should = 'Should'
    may = 'May'


@attr.s
class Req:
    who = attr.ib()
    priority = attr.ib()
    action = attr.ib()
    obj = attr.ib()
    how = attr.ib()
    when = attr.ib()
    text = attr.ib(convert=lambda s: s.strip())


data = [
    Req('All agencies', Priority.should, 'send', 'SAO report',
        'to PRMD@nara.gov', date(2014, 1, 31), """
            Due to the recent government shutdown, the beginning of the reporting period was delayed. In consultation with the Office of Management and Budget (OMB), we have extended the reporting deadline from�December 31, 2013 to January 31, 2014 for the following:
            1. Senior Agency Official (SAO) annual report: Progress towards specific goals or requirements in NARA/OMB M-12-18, Managing Government Records Directive. You should have received instructions and the template for the report on August 29, 2013.  (SEE AC 29 2013: Senior Agency Official Annual Report Template). [obj:Reports] [priority:should] be [action:sent] [how:to PRMD@nara.gov] by [when:Friday, January 31, 2014].
        """),
    Req('All agencies', Priority.must, 'send', 'RMSA spreadsheet',
        'to rmselfassessment@nara.gov', date(2014, 1, 31), """
            Due to the recent government shutdown, the beginning of the reporting period was delayed. In consultation with the Office of Management and Budget (OMB), we have extended the reporting deadline from�December 31, 2013 to January 31, 2014 for the following:
            2. Records Management Self Assessment (RMSA): Directive Requirements - 2.2 and 2.5: As part of this year's RMSA, you must submit your agency's responses to two requirements established in the Managing Government Records Directive:
            a) Part I, Section 2, Requirement 2.2 requires your agency to identify for transfer its permanent records that have been in existence for more than 30 years and report this information to NARA.
            b) Part I, Section 2, Requirement 2.5 requires your agency's Records Officer to identify all unscheduled records in your agency.  This requirement also covers all records stored at NARA and in other storage facilities that have not been properly scheduled.

            Your agency's responses to these requirements must be submitted using the spreadsheets provided by NARA earlier this year.  (See AC 23.2013: NARA/OMB M-12-18, Goals Due on or Before December 31, 2013.) All [obj:spreadsheets] [priority:must] be [action:sent] [how:to rmselfassessment@nara.gov] by [when:January 31, 2014].
        """),
    Req('All agencies', Priority.should, 'reaffirm or designate', 'new SAO',
        'by sending their information to PRMD@nara.gov', date(2013, 11, 15),
        """
            Due to the recent government shutdown, the beginning of the reporting period was delayed. In consultation with the Office of Management and Budget (OMB), we have extended the reporting deadline from�December 31, 2013 to January 31, 2014 for the following:

            Annual SAO Designation: please [action:reaffirm or designate] [obj:a new SAO] [how:by sending the name, title, agency, office, email, phone number, and address information of the agency SAO to PRMD@nara.gov] by [when:November 15, 2013].
        """),
    Req('CFO Act agency heads', Priority.must, 'designate', 'SSAO',
        'by sending the proposed their contact info to OMB', date(2013, 1, 15),
        """
            Therefore, the [who:head of each of the 24 Chief Financial Officer (CFO) Act agencies] [priority:shall] [action:designate] a [obj:Strategic Sourcing Accountable Official (SSAO)], who will have the authority to coordinate the agency's internal strategic sourcing activities and its participation in government wide efforts, such as those described below. Each agency shall [how:send the proposed SSAO's name and contact information to OMB] by [when:January 15, 2013].
        """),
    Req('SSLC', Priority.must, 'meet', None, None, 'regularly',
        """
            The [who:SSLC] [priority:will] [action:meet] [when:regularly] to provide long-term leadership of the government's strategic sourcing efforts as well as to take actions that save taxpayer dollars now.
        """),
    Req('SSLC', Priority.must, 'submit', 'set of recommendations', 'to OMB',
        date(2013, 3, 1), """
            To that end, by [when:March 2013], the [who:SSLC] [priority:shall] [action:submit] [how:to OMB] a [obj:set of recommendations] for management strategies for specific goods and services � including several IT commodities identified through the PortfolioStat process
            - that would ensure that the Federal government receives the most favorable offer possible.
        """),
    Req('SSLC', Priority.must, 'promote', 'sound strategic sourcing practices',
        'within their agencies', None, """
            Each of the [who:SSLC agencies] [priority:shall] [action:promote], to the maximum extent practicable, [obj:sound strategic sourcing practices] [how:within their agencies].
        """),
    Req('SSLC', Priority.must, 'establish', 'internal sourcing council',
        None, None, """
            Each [who:SSLC agency] [priority:shall] [action:establish] an [obj:internal cross-functional strategic sourcing council] to oversee the agency's related activities.
        """),
    Req('GSA', Priority.must, 'implement',
        'at least five new strategic sourcing solutions',
        'in consulation with the SSLC', 'FY 2013 and FY 2014', """
            The [who:Administrator of General Services] [priority:shall]:
            �� [action:implement], [how:in consultation with the SSLC], [obj:at least five new government-wide strategic sourcing solutions] in each of [when:FY 2013 and FY 2014];
        """),
    Req('GSA', Priority.must, 'increase',
        'transparency of prices paid by agency officials', None, None, """
            The [who:Administrator of General Services] [priority:shall]:
            �� [action:increase] the [obj:transparency of prices paid for common goods and services for use by agency officials in market research and negotiations]; and
        """),
    Req('GSA', Priority.must, 'promulgate',
        'requirements for SSI managed commodities', None, 'as needed', """
            The [who:Administrator of General Services] [priority:shall]:
            �� [when:as needed], [action:promulgate] [obj:requirements, regulations, and best practices for acquiring, using, and, where applicable, disposing of the commodities managed through strategic sourcing initiatives.]
        """),
    Req("CFO Act agencies' vehicles", Priority.must, 'reflect',
        'input from agency users', None, None, """
            However, at a minimum, [who:government-wide vehicles] [priority:shall]:
            � [action:reflect] [obj:input from a large number of potential agency users � especially the largest likely users � regarding customer demand for the goods and services being considered, the acquisition strategy (including contract pricing, delivery and other terms and conditions, and performance requirements), and the commodity management approach];
        """),
    Req("CFO Act agencies' vehicles", Priority.must, 'ensure',
        'the Federal government gets credit for all vehicle sales', None,
        None, """
            However, at a minimum, [who:government-wide vehicles] [priority:shall]:
            �  [action:ensure] that [obj:the Federal government gets credit for all sales provided under that vehicle, regardless of payment method, unless the sales are identified with other government contracts], so that volume-based pricing discounts can be applied;
        """),
    Req("CFO Act agencies' vehicles", Priority.must, 'include',
        'tiered pricing, or other appropriate strategies', None, None, """
            However, at a minimum, [who:government-wide vehicles] [priority:shall]:
            � [action:include] [obj:tiered pricing, or other appropriate strategies], to reduce prices as cumulative sales volume increases;
        """),
    Req("CFO Act agencies' vehicles", Priority.must, 'require',
        'sufficient pricing, usage, and performance data', 'from vendors',
        None, """
            However, at a minimum, [who:government-wide vehicles] [priority:shall]:
            � [action:require] [how:vendors to provide] [obj:sufficient pricing, usage, and performance data] to enable the government to improve their commodity management practices on an ongoing basis; and
        """),
    Req("CFO Act agencies' vehicles' contract administration plan",
        Priority.must, 'include', 'active commodity management',
        'by the executive agent', None, """
            However, at a minimum, government-wide vehicles [priority:shall]:
            �      be supported by a [who:contract administration plan] that demonstrates commitment [how:by the executive agent] to [obj:perform active commodity management] and monitor vendor performance and pricing changes throughout the life of the contract to ensure the benefits of strategic sourcing are maintained.
        """),
    Req("CFO Act agencies' vehicles' contract administration plan",
        Priority.must, 'include',
        'monitoring of vendor performance and pricing changes',
        'by the executive agent', None, """
            However, at a minimum, government-wide vehicles [priority:shall]:
            �      be supported by a [who:contract administration plan] that demonstrates commitment [how:by the executive agent] to perform active commodity management and [obj:monitor vendor performance and pricing changes throughout the life of the contract] to ensure the benefits of strategic sourcing are maintained.
        """),
    Req("CFO Act agencies' strategic sourcing opportunities", Priority.must, 'seek to increase',
        'participation by small business', None, None, """
            To the maximum extent practicable, all [who:strategic sourcing opportunities] [priority:shall] [action:seek to increase] [obj:participation by small businesses].
        """),
    Req("CFO Act agencies' proposed strategic sourcing agreements",
        Priority.must, 'baseline', 'small business use',
        'under current strategies', None, """
            All [who:proposed strategic sourcing agreements] [priority:must] [action:baseline] [obj:small business use] [how:under current strategies] and set goals to meet or exceed that baseline participation under the new strategic sourcing vehicles.
        """),
    Req("CFO Act agencies' proposed strategic sourcing agreements",
        Priority.must, 'set', 'goals to meet or exceed baseline participation',
        'under the new strategic sourcing vehicles', None, """
            All [who:proposed strategic sourcing agreements] [priority:must] baseline small business use under current strategies and [action:set] [obj:goals to meet or exceed that baseline participation] [how:under the new strategic sourcing vehicles].
        """),
]

if __name__ == '__main__':
    print("""
<html>
<head>
    <style type="text/css">
        .who {
            color: blue;
        }
        .priority {
            color: red;
            font-weight: bold;
        }
        .action {
            color: purple;
        }
        .obj {
            color: green;
        }
        .how {
            color: darkred;
            font-style: italic;
        }
        .when {
            color: orange;
        }
        .container {
            border: 1px solid black;
            padding: 10px;
            margin: 5px;
            width: 80%;
        }
        .container .text {
            display: none;
        }
        .container .req {
            display: block;
        }
        .container:hover .text {
            display: block;
        }
        .container:hover .req {
            display: none;
        }
    </style>
</head>
<body>
    """)
    for req in data:
        text = re.sub(r'\[(?P<class_name>[^:]*):(?P<text>[^\]]*)\]',
                      lambda m: '<span class="{0}">{1}</span>'.format(
                          m.group('class_name'), m.group('text')), req.text)

        text = text.replace('\n', '<br />')
        print("<div class='container'><p class='text'>{0}</p>".format(text))
        print("<p class='req'>")
        print("<span class='who'>{0}</span>".format(req.who))
        print("<span class='priority'>{0}</span>".format(req.priority.name))
        print("<span class='action'>{0}</span>".format(req.action))
        if req.obj:
            print("<span class='obj'>{0}</span>".format(req.obj))
        if req.how:
            print("<span class='how'>{0}</span>".format(req.how))
        if isinstance(req.when, date):
            print("by <span class='when'>{0}</span>".format(
                req.when.isoformat()))
        elif req.when:
            print("<span class='when'>{0}</span>".format(req.when))
        print("</div>")
    print("""
</body>
</html>
    """)
