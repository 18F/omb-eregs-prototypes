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
    subjects = attr.ib()
    priority = attr.ib()
    due_date = attr.ib()
    action = attr.ib()
    req_id = attr.ib()
    req_text = attr.ib()
    citations = attr.ib(default=attr.Factory(list))


data = [
    Req(['All agencies'], Priority.should, date(2014, 1, 31),
        "send SAO report to PRMD@nara.gov", "73.01", """
            Due to the recent government shutdown, the beginning of the
            reporting period was delayed. In consultation with the Office of
            Management and Budget (OMB), we have extended the reporting
            deadline from�December 31, 2013 to January 31, 2014 for the
            following: 1. Senior Agency Official (SAO) annual report: Progress
            towards specific goals or requirements in NARA/OMB M-12-18,
            Managing Government Records Directive. You should have received
            instructions and the template for the report on August 29, 2013.
            (SEE AC 29 2013: Senior Agency Official Annual Report Template).
            Reports should be sent to PRMD@nara.gov by Friday, January 31,
            2014.
        """, ["SAO report"]),
    Req(['All agencies'], Priority.must, date(2014, 1, 31),
        "send RMSA spreadsheet to rmselfassessment@nara.gov", "73.02", """
            Due to the recent government shutdown, the beginning of the
            reporting period was delayed. In consultation with the Office of
            Management and Budget (OMB), we have extended the reporting
            deadline from�December 31, 2013 to January 31, 2014 for the
            following: 2. Records Management Self Assessment (RMSA): Directive
            Requirements - 2.2 and 2.5: As part of this year's RMSA, you must
            submit your agency's responses to two requirements established in
            the Managing Government Records Directive: a) Part I, Section 2,
            Requirement 2.2 requires your agency to identify for transfer its
            permanent records that have been in existence for more than 30
            years and report this information to NARA.  b) Part I, Section 2,
            Requirement 2.5 requires your agency's Records Officer to identify
            all unscheduled records in your agency.  This requirement also
            covers all records stored at NARA and in other storage facilities
            that have not been properly scheduled.

            Your agency's responses to these requirements must be submitted
            using the spreadsheets provided by NARA earlier this year.  (See
            AC 23.2013: NARA/OMB M-12-18, Goals Due on or Before December 31,
            2013.) All spreadsheets must be sent to rmselfassessment@nara.gov
            by January 31, 2014.
        """, ["RMSA spreadsheet"]),
    Req(['All agencies'], Priority.should, date(2013, 11, 15),
        """reaffirm or designate a new SAO by sending the name, title, agency,
        office, email, phone number, and address information of the agency SAO
        to PRMD@nara.gov""", "73.03", """
            Due to the recent government shutdown, the beginning of the
            reporting period was delayed. In consultation with the Office of
            Management and Budget (OMB), we have extended the reporting
            deadline from�December 31, 2013 to January 31, 2014 for the
            following:

            Annual SAO Designation: please reaffirm or designate a new SAO by
            sending the name, title, agency, office, email, phone number, and
            address information of the agency SAO to PRMD@nara.gov  by
            November 15, 2013.
        """, ["SAO"]),
    Req(['CFO ACT agency heads'], Priority.must, date(2013, 1, 15),
        "designate a SSAO", "74.03", """
            Therefore, the head of each of the 24 Chief Financial Officer
            (CFO) Act agencies shall designate a Strategic Sourcing
            Accountable Official (SSAO), who will have the authority to
            coordinate the agency's internal strategic sourcing activities and
            its participation in government wide efforts, such as those
            described below. Each agency shall send the proposed SSAO's name
            and contact information to OMB by January 15, 2013.
        """, ['SSAO']),
    Req(['CFO ACT agency heads'], Priority.must, date(2013, 1, 15),
        "send proposed SSAO's name and contact information to OMB", "74.03",
        """
            Therefore, the head of each of the 24 Chief Financial Officer
            (CFO) Act agencies shall designate a Strategic Sourcing
            Accountable Official (SSAO), who will have the authority to
            coordinate the agency's internal strategic sourcing activities and
            its participation in government wide efforts, such as those
            described below. Each agency shall send the proposed SSAO's name
            and contact information to OMB by January 15, 2013.
        """, ['SSAO']),
    Req(['SSLC'], Priority.must, None, 'meet regularly', '74.05',
        """
            The SSLC will meet regularly to provide long-term leadership of
            the government's strategic sourcing efforts as well as to take
            actions that save taxpayer dollars now.
        """),
    Req(['SSLC'], Priority.must, date(2013, 3, 1),
        'submit to OMB a set of recommendations', '74.06', """
            To that end, by March 2013, the SSLC shall submit to OMB a set of
            recommendations for management strategies for specific goods and
            services � including several IT commodities identified through the
            PortfolioStat process
            - that would ensure that the Federal government receives the most
              favorable offer possible.
        """, ['recommendations']),
    Req(['SSLC'], Priority.must, None,
        'promote sound strategic sourcing practices within their agencies',
        '74.14', """
            Each of the SSLC agencies shall promote, to the maximum extent
            practicable, sound strategic sourcing practices within their
            agencies.
        """),
    Req(['SSLC'], Priority.must, None, """
            establish an internal cross-functional strategic sourcing council
            to oversee the agency's related activities""", '74.15', """
            Each SSLC agency shall establish an internal cross-functional
            strategic sourcing council to oversee the agency's related
            activities.
        """),
    Req(['GSA'], Priority.must, date(2013, 10, 1), """
            implement, in consultation with the SSLC, at least five new
            government-wide strategic sourcing solutions""", '74.17', """
            The Administrator of General Services shall: �� implement, in
            consultation with the SSLC, at least five new government-wide
            strategic sourcing solutions in each of FY 2013 and FY 2014;
        """, ['SSLC']),
    Req(['GSA'], Priority.must, date(2014, 10, 1), """
            implement, in consultation with the SSLC, at least five new
            government-wide strategic sourcing solutions""", '74.17', """
            The Administrator of General Services shall: �� implement, in
            consultation with the SSLC, at least five new government-wide
            strategic sourcing solutions in each of FY 2013 and FY 2014;
        """, ['SSLC']),
    Req(['GSA'], Priority.must, None, """
            increase the transparency of prices paid for common goods and
            services for use by agency officials in market research and
            negotiations""", '74.18', """
            The Administrator of General Services shall: �� increase the
            transparency of prices paid for common goods and services for use
            by agency officials in market research and negotiations; and
        """),
    Req(['GSA'], Priority.must, None, """
            as needed, promulgate requirements, regulations, and best
            practices for acquiring, using, and, where applicable, disposing
            of the commodities managed through strategic sourcing
            initiatives.""", '74.19', """
            The Administrator of General Services shall: �� as needed,
            promulgate requirements, regulations, and best practices for
            acquiring, using, and, where applicable, disposing of the
            commodities managed through strategic sourcing initiatives.
        """),
    Req(["CFO Act agencies' government-wide vehicles"], Priority.must, None,
        """
            reflect input from a large number of potential agency users �
            especially the largest likely users � regarding customer demand
            for the goods and services being considered, the acquisition
            strategy (including contract pricing, delivery and other terms and
            conditions, and performance requirements), and the commodity
            management approach""", '74.20', """
            However, at a minimum, government-wide vehicles shall:  � reflect
            input from a large number of potential agency users � especially
            the largest likely users � regarding customer demand for the goods
            and services being considered, the acquisition strategy (including
            contract pricing, delivery and other terms and conditions, and
            performance requirements), and the commodity management approach;
        """),
    Req(["CFO Act agencies' government-wide vehicles"], Priority.must, None,
        """
            ensure that the Federal government gets credit for all sales
            provided under that vehicle, regardless of payment method, unless
            the sales are identified with other government contracts, so that
            volume-based pricing discounts can be applied""", '74.21', """
            However, at a minimum, government-wide vehicles shall:  �  ensure
            that the Federal government gets credit for all sales provided
            under that vehicle, regardless of payment method, unless the sales
            are identified with other government contracts, so that
            volume-based pricing discounts can be applied;
        """),
    Req(["CFO Act agencies' government-wide vehicles"], Priority.must, None,
        """
            include tiered pricing, or other appropriate strategies, to reduce
            prices as cumulative sales volume increases""", '74.22', """
            However, at a minimum, government-wide vehicles shall:  �
            include tiered pricing, or other appropriate strategies, to reduce
            prices as cumulative sales volume increases;
        """),
    Req(["CFO Act agencies' government-wide vehicles"], Priority.must, None,
        """
            require vendors to provide sufficient pricing, usage, and
            performance data to enable the government to improve their
            commodity management practices on an ongoing basis""", '74.23', """
            However, at a minimum, government-wide vehicles shall:  �
            require vendors to provide sufficient pricing, usage, and
            performance data to enable the government to improve their
            commodity management practices on an ongoing basis; and
        """),
    Req(["CFO Act agencies' government-wide vehicles"], Priority.must, None,
        """
            be supported by a contract administration plan that demonstrates
            commitment by the executive agent to perform active commodity
            management and monitor vendor performance and pricing changes
            throughout the life of the contract to ensure the benefits of
            strategic sourcing are maintained.""", '74.24', """
            However, at a minimum, government-wide vehicles shall:  �      be
            supported by a contract administration plan that demonstrates
            commitment by the executive agent to perform active commodity
            management and monitor vendor performance and pricing changes
            throughout the life of the contract to ensure the benefits of
            strategic sourcing are maintained.
        """),
    Req(['CFO Act agencies'], Priority.must, None, """
            seek to increase participation by small business""", '74.25', """
            To the maximum extent practicable, all strategic sourcing
            opportunities shall seek to increase participation by small
            businesses.
        """),
    Req(["CFO Act agencies' strategic sourcing agreements"], Priority.must,
        None, "baseline small business use under current strategies", '74.26',
        """
            All proposed strategic sourcing agreements must baseline small
            business use under current strategies and set goals to meet or
            exceed that baseline participation under the new strategic
            sourcing vehicles.
        """),
    Req(["CFO Act agencies' strategic sourcing agreements"], Priority.must,
        None, """
            set goals to meet or exceed baseline participation under the new
            strategic sourcing vehicles""", '74.27', """
            All proposed strategic sourcing agreements must baseline small
            business use under current strategies and set goals to meet or
            exceed that baseline participation under the new strategic
            sourcing vehicles.
        """),
]
data = list(sorted(data, key=lambda r: r.due_date or date(2222, 2, 2)))

if __name__ == '__main__':
    print("""
<html>
<head>
    <style type="text/css">
        .due {
            color: green;
        }
        .actor {
            color: purple;
        }
        .priority {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    """)
    for req in data:
        title = "{0}: {1}".format(req.req_id, req.req_text.replace('"', "'"))
        text = req.action
        for cit in req.citations:
            text = text.replace(
                cit, '<a href="#not-implemented">{0}</a>'.format(cit))
        print('<p title="{0}">'.format(title))
        if req.due_date:
            print('<span class="due">By {0}</span>'.format(
                req.due_date.isoformat()))
        print("""
                <span class="actor">{0}</span>
                <span class="priority">{1}</span>
                {2}
            </p>
        """.format(req.subjects[0], req.priority.value, text))
    print("""
</body>
</html>
    """)
