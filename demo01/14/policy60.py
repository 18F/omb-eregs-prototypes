import re
from enum import Enum

import attr


class Keywords(Enum):
    digital_services = "Digital Services"
    it_transparency = "IT Transparency (Open Data, FOIA, Public Records, etc.)"
    customer_services = "Customer Services"
    software = "Software"
    governance = "Governance"
    hardware = "Hardware/Government Furnished Equipment (GFE)"
    finance = "Financial Systems"
    it_pm = "IT Project Management"
    cybersec = "Cybersecurity"


@attr.s
class Req:
    prefix_to_ignore = attr.ib(default="")
    verbs = attr.ib(default=attr.Factory(list))
    keywords = attr.ib(default=attr.Factory(list))


@attr.s
class Node:
    text = attr.ib(default='', convert=lambda s: s.strip())
    title = attr.ib(default=None)
    children = attr.ib(default=attr.Factory(list))
    req = attr.ib(default=None)

    def templated(self, depth):
        text = ""
        if self.title:
            text += "<h{0}>{1}</h{0}>\n".format(depth, self.title)
        text += self.templated_text
        if self.children:
            text += "<ol>\n"
            for child in self.children:
                text += "<li>" + child.templated(depth + 1) + "</li>\n"
            text += "</ol>\n"
        return text

    @property
    def templated_text(self):
        if not self.text:
            return ''
        text = self.text
        if self.req:
            attr_text = ''
            if self.req.keywords:
                keywords = ', '.join(kw.value for kw in self.req.keywords)
                attr_text = ' title="{0}"'.format(keywords)
            text = "{0}<span class='req'{1}>{2}</span>".format(
                text[:len(self.req.prefix_to_ignore)], attr_text,
                text[len(self.req.prefix_to_ignore):])
            for verb in self.req.verbs:
                text = re.sub(
                    verb,
                    lambda m: "<span class='verb'>" + m.group(0) + "</span>",
                    text
                )
            return '<p>{0}</p>\n'.format(text)
        else:
            return '<p class="no-req">{0}</p>\n'.format(text)


root = Node(children=[
    Node('December 8, 2009'),
    Node('M-10-06'),
    Node('MEMORANDUM FOR THE HEADS OF EXECUTIVE DEPARTMENTS AND AGENCIES'),
    Node('FROM:\tPeter R. Orszag\nDirector'),
    Node('SUBJECT:\tOpen Government Directive'),
    Node("""
        In the Memorandum on Transparency and Open Government, issued on
        January 21, 2009, the President instructed the Director of the Office
        of Management and Budget (OMB) to issue an Open Government Directive.
        Responding to that instruction, this memorandum is intended to direct
        executive departments and agencies to take specific actions to
        implement the principles of transparency, participation, and
        collaboration set forth in the President’s Memorandum. This Directive
        was informed by recommendations from the Federal Chief Technology
        Officer, who solicited public comment through the White House Open
        Government Initiative."""),
    Node("""
        The three principles of transparency, participation, and collaboration
        form the cornerstone of an open government. Transparency promotes
        accountability by providing the public with information about what the
        Government is doing.  Participation allows members of the public to
        contribute ideas and expertise so that their government can make
        policies with the benefit of information that is widely dispersed in
        society.  Collaboration improves the effectiveness of Government by
        encouraging partnerships and cooperation within the Federal
        Government, across levels of government, and between the Government
        and private institutions."""),
    Node("""
        This Open Government Directive establishes deadlines for action. But
        because of the presumption of openness that the President has
        endorsed, agencies are encouraged to advance their open government
        initiatives well ahead of those deadlines. In addition to the steps
        delineated in this memorandum, Attorney General Eric Holder earlier
        this year issued new guidelines for agencies with regard to the
        Freedom of Information Act (FOIA).  With those guidelines, the
        Attorney General reinforced the principle that openness is the Federal
        Government’s default position for FOIA issues."""),
    Node("""
        This memorandum requires executive departments and agencies to take
        the following steps toward the goal of creating a more open
        government:"""),
    Node(title="1. Publish Government Information Online"),
    Node(title="2. Improve the Quality of Government Information"),
    Node(title="3. Create and Institutionalize a Culture of Open Government"),
    Node(title="4. Create an Enabling Policy Framework for Open Government"),
    Node("""
        Nothing in this Directive shall be construed to supersede existing
        requirements for review and clearance of pre-decisional information by
        the Director of the Office of Management and Budget relating to
        legislative, budgetary, administrative, and regulatory materials.
        Moreover, nothing in this Directive shall be construed to suggest that
        the presumption of openness precludes the legitimate protection of
        information whose release would threaten national security, invade
        personal privacy, breach confidentiality, or damage other genuinely
        compelling interests."""),
    Node("""
        If you have any questions regarding this memorandum, please direct
        them to opengov@omb.eop.gov or call Nicholas Fraser, Information
        Policy Branch, Office of Information and Regulatory Affairs, Office of
        Management and Budget at (202) 395-3785."""),
    Node("Attachment"),
    Node(title="Open Government Plan"),
    Node("""
        1. Formulating the Plan: Your agency’s Open Government Plan is the
        public roadmap that details how your agency will incorporate the
        principles of the President’s January 21, 2009, Memorandum on
        Transparency and Open Government into the core mission objectives of
        your agency. The Plan should reflect the input of (a) senior policy,
        legal, and technology leadership in your agency and (b) the general
        public and open government experts. It should detail the specific
        actions that your agency will undertake and the timeline on which it
        will do so."""),
    Node("""
        2. Publishing the Plan: Consistent with the deadlines set forth in
        this Directive, the Plan should be published online on the agency’s
        Open Government Webpage in an open format that enables the public to
        download, analyze, and visualize any information and data in the Plan.
        """),
    Node("3. Components of the Plan:")
])
root.children[9].children.extend([
    Node("""
        To increase accountability, promote informed participation by the
        public, and create economic opportunity, each agency shall take prompt
        steps to expand access to information by making it available online in
        open formats. With respect to information, the presumption shall be in
        favor of openness (to the extent permitted by law and subject to valid
        privacy, confidentiality, security, or other restrictions)"""),
    Node("""
        a. Agencies shall respect the presumption of openness by publishing
        information online (in addition to any other planned or mandated
        publication methods) and by preserving and maintaining electronic
        information, consistent with the Federal Records Act and other
        applicable law and policy.  Timely publication of information is an
        essential component of transparency. Delays should not be viewed as an
        inevitable and insurmountable consequence of high demand."""),
    Node("""
        b. To the extent practicable and subject to valid restrictions,
        agencies should publish information online in an open format that can
        be retrieved, downloaded, indexed, and searched by commonly used web
        search applications. An open format is one that is platform
        independent, machine readable, and made available to the public
        without restrictions that would impede the re-use of that information.
        """),
    Node("""
        c. To the extent practical and subject to valid restrictions, agencies
        should proactively use modern technology to disseminate useful
        information, rather than waiting for specific requests under FOIA.
        """),
    Node("""
        d. Within 45 days, each agency shall identify and publish online in an
        open format at least three high-value data sets (see attachment
        section 3.a.i) and register those data sets via Data.gov. These must
        be data sets not previously available online or in a downloadable
        format."""),
    Node("""
        e. Within 60 days, each agency shall create an Open Government Webpage
        located at http://www.[agency].gov/open to serve as the gateway for
        agency activities related to the Open Government Directive and shall
        maintain and update that webpage in a timely fashion."""),
    Node("""
        f. Each Open Government Webpage shall incorporate a mechanism for the
        public to:"""),
    Node("""
        g. Each agency shall respond to public input received on its Open
        Government Webpage on a regular basis."""),
    Node("""
        h. Each agency shall publish its annual Freedom of Information Act
        Report in an open format on its Open Government Webpage in addition to
        any other planned dissemination methods."""),
    Node("""
        i. Each agency with a significant pending backlog of outstanding
        Freedom of Information requests shall take steps to reduce any such
        backlog by ten percent each year."""),
    Node("""
        j. Each agency shall comply with guidance on implementing specific
        Presidential open government initiatives, such as Data.gov,
        eRulemaking, IT Dashboard, Recovery.gov, and USAspending.gov."""),
])
root.children[9].children[6].children.extend([
    Node("""
        i. Give feedback on and assessment of the quality of published
        information;"""),
    Node("""
        ii. Provide input about which information to prioritize for
        publication; and"""),
    Node("""
        iii. Provide input on the agency’s Open Government Plan (see 3.a.).
        """),
])
root.children[10].children.extend([
    Node("""
       To improve the quality of government information available to the
       public, senior leaders should make certain that the information
       conforms to OMB guidance on information quality and that adequate
       systems and processes are in place within the agencies to promote such
       conformity."""),
    Node("""
       a. Within 45 days, each agency, in consultation with OMB, shall
       designate a highlevel senior official to be accountable for the
       quality and objectivity of, and internal controls over, the Federal
       spending information publicly disseminated through such public venues
       as USAspending.gov or other similar websites. The official shall
       participate in the agency’s Senior Management Council, or similar
       governance structure, for the agency-wide internal control assessment
       pursuant to the Federal Managers’ Financial Integrity Act."""),
    Node("""
       b. Within 60 days, the Deputy Director for Management at OMB will
       issue, through separate guidance or as part of any planned
       comprehensive management guidance, a framework for the quality of
       Federal spending information publicly disseminated through such public
       venues as USAspending.gov or other similar websites. The framework
       shall require agencies to submit plans with details of the internal
       controls implemented over information quality, including system and
       process changes, and the integration of these controls within the
       agency’s existing infrastructure. An assessment will later be made as
       to whether additional guidance on implementing OMB guidance on
       information quality is necessary to cover other types of government
       information disseminated to the public."""),
    Node("""
       c. Within 120 days, the Deputy Director for Management at OMB will
       issue, through separate guidance or as part of any planned
       comprehensive management guidance, a longer-term comprehensive
       strategy for Federal spending transparency, including the Federal
       Funding Accountability Transparency Act and the American Reinvestment
       and Recovery Act. This guidance will identify the method for agencies
       to report quarterly on their progress toward improving their
       information quality"""),
])
root.children[11].children.extend([
    Node("""
        To create an unprecedented and sustained level of openness and
        accountability in every agency, senior leaders should strive to
        incorporate the values of transparency, participation, and
        collaboration into the ongoing work of their agency. Achieving a more
        open government will require the various professional disciplines
        within the Government – such as policy, legal, procurement, finance,
        and technology operations – to work together to define and to develop
        open government solutions.  Integration of various disciplines
        facilitates organization-wide and lasting change in the way that
        Government works."""),
    Node("""
        a. Within 120 days, each agency shall develop and publish on its Open
        Government Webpage an Open Government Plan that will describe how it
        will improve transparency and integrate public participation and
        collaboration into its activities.  Additional details on the required
        content of this plan are attached. Each agency’s plan shall be updated
        every two years."""),
    Node("""
        b. Within 60 days, the Federal Chief Information Officer and the
        Federal Chief Technology Officer shall create an Open Government
        Dashboard on www.whitehouse.gov/open. The Open Government Dashboard
        will make available each agency’s Open Government Plan, together with
        aggregate statistics and visualizations designed to provide an
        assessment of the state of open government in the Executive Branch and
        progress over time toward meeting the deadlines for action outlined in
        this Directive"""),
    Node("""
        c. Within 45 days, the Deputy Director for Management at OMB, the
        Federal Chief Information Officer, and the Federal Chief Technology
        Officer will establish a working group that focuses on transparency,
        accountability, participation, and collaboration within the Federal
        Government. This group, with senior level representation from program
        and management offices throughout the Government, will serve several
        critical functions, including:"""),
    Node("""
        d. Within 90 days, the Deputy Director for Management at OMB will
        issue, through separate guidance or as part of any planned
        comprehensive management guidance, a framework for how agencies can
        use challenges, prizes, and other incentive-backed strategies to find
        innovative or cost-effective solutions to improving open government.
        """)
])
root.children[11].children[3].children.extend([
    Node("""
        i. Providing a forum to share best practices on innovative ideas to
        promote transparency, including system and process solutions for
        information collection, aggregation, validation, and dissemination;
        """),
    Node("""
        ii. Coordinating efforts to implement existing mandates for Federal
        spending transparency, including the Federal Funding Accountability
        Transparency Act and the American Reinvestment and Recovery Act; and
        """),
    Node("""
        iii. Providing a forum to share best practices on innovative ideas to
        promote participation and collaboration, including how to experiment
        with new technologies, take advantage of the expertise and insight of
        people both inside and outside the Federal Government, and form
        high-impact collaborations with researchers, the private sector, and
        civil society."""),
])
root.children[12].children.extend([
    Node("""
        Emerging technologies open new forms of communication between a
        government and the people. It is important that policies evolve to
        realize the potential of technology for open government."""),
    Node("""
        a. Within 120 days, the Administrator of the Office of Information and
        Regulatory Affairs (OIRA), in consultation with the Federal Chief
        Information Officer and the Federal Chief Technology Officer, will
        review existing OMB policies, such as Paperwork Reduction Act guidance
        and privacy guidance, to identify impediments to open government and
        to the use of new technologies and, where necessary, issue clarifying
        guidance and/or propose revisions to such policies, to promote greater
        openness in government."""),
])
root.children[19].children.extend([
    Node("""
        a. Transparency: Your agency’s Open Government Plan should explain in
        detail how your agency will improve transparency. It should describe
        steps the agency will take to conduct its work more openly and publish
        its information online, including any proposed changes to internal
        management and administrative policies to improve transparency.
        Specifically, as part of your Plan to enhance information
        dissemination, your agency should describe how it is currently meeting
        its legal information dissemination obligations, and how it plans to
        improve its existing information dissemination practices by providing:
        """),
    Node("""
        b. Participation: To create more informed and effective policies, the
        Federal Government should promote opportunities for the public to
        participate throughout the decision-making process. Your agency’s Open
        Government Plan should explain in detail how your agency will improve
        participation, including steps your agency will take to revise its
        current practices to increase opportunities for public participation
        in and feedback on the agency’s core mission activities. The specific
        details should include proposed changes to internal management and
        administrative policies to improve participation."""),
    Node("""
        c. Collaboration: Your agency’s Open Government Plan should explain in
        detail how your agency will improve collaboration, including steps the
        agency will take to revise its current practices to further
        cooperation with other Federal and non-Federal governmental agencies,
        the public, and non-profit and private entities in fulfilling the
        agency’s core mission activities. The specific details should include
        proposed changes to internal management and administrative policies to
        improve collaboration."""),
    Node("""
        d. Flagship Initiative: Each agency’s Open Government Plan should
        describe at least one specific, new transparency, participation, or
        collaboration initiative that your agency is currently implementing
        (or that will be implemented before the next update of the Open
        Government Plan). That description should include: """),
    Node("""
        e. Public and Agency Involvement: Your agency’s Open Government Plan
        should include, but not be limited to, the requirements set forth in
        this attachment. Extensive public and employee engagement should take
        place during the formation of this plan, which should lead to the
        incorporation of relevant and useful ideas developed in that dialogue.
        Public engagement should continue to be part of your agency’s periodic
        review and modification of its plan. Your agency should respond to
        public feedback on a regular basis.""")
])
root.children[19].children[0].children.extend([
    Node("""
        i. A strategic action plan for transparency that (1) inventories
        agency high-value information currently available for download; (2)
        fosters the public’s use of this information to increase public
        knowledge and promote public scrutiny of agency services; and (3)
        identifies high value information not yet available and establishes a
        reasonable timeline for publication online in open formats with
        specific target dates. High-value information is information that can
        be used to increase agency accountability and responsiveness; improve
        public knowledge of the agency and its operations; further the core
        mission of the agency; create economic opportunity; or respond to need
        and demand as identified through public consultation. """),
    Node("""
        ii. In cases where the agency provides public information maintained
        in electronic format, a plan for timely publication of the underlying
        data.  This underlying data should be in an open format and as
        granular as possible, consistent with statutory responsibilities and
        subject to valid privacy, confidentiality, security, or other
        restrictions. Your agency should also identify key audiences for its
        information and their needs, and endeavor to publish high-value
        information for each of those audiences in the most accessible forms
        and formats. In particular, information created or commissioned by the
        Government for educational use by teachers or students and made
        available online should clearly demarcate the public’s right to use,
        modify, and distribute the information. """),
    Node("""
        iii. Details as to how your agency is complying with transparency
        initiative guidance such as Data.gov, eRulemaking, IT Dashboard,
        Recovery.gov, and USAspending.gov. Where gaps exist, the agency should
        detail the steps the agency is taking and the timing to meet the
        requirements for each initiative."""),
    Node("""
        iv. Details of proposed actions to be taken, with clear milestones, to
        inform the public of significant actions and business of your agency,
        such as through agency public meetings, briefings, press conferences
        on the Internet, and periodic national town hall meetings."""),
    Node("""
        v. A link to a publicly available website that shows how your agency
        is meeting its existing records management requirements. These
        requirements serve as the foundation for your agency’s records
        management program, which includes such activities as identifying and
        scheduling all electronic records, and ensuring the timely transfer of
        all permanently valuable records to the National Archives."""),
    Node("""
        vi. A link to a website that includes (1) a description of your
        staffing, organizational structure, and process for analyzing and
        responding to FOIA requests; (2) an assessment of your agency’s
        capacity to analyze, coordinate, and respond to such requests in a
        timely manner, together with proposed changes, technological
        resources, or reforms that your agency determines are needed to
        strengthen your response processes; and (3) if your agency has a
        significant backlog, milestones that detail how your agency will
        reduce its pending backlog of outstanding FOIA requests by at least
        ten percent each year.  Providing prompt responses to FOIA requests
        keeps the public apprised of specific informational matters they seek.
        """),
    Node("""
        vii. A description or link to a webpage that describes your staffing,
        organizational structure, and process for analyzing and responding to
        Congressional requests for information. """),
    Node("""
        viii. A link to a publicly available webpage where the public can
        learn about your agency’s declassification programs, learn how to
        access declassified materials, and provide input about what types of
        information should be prioritized for declassification, as
        appropriate.  Declassification of government information that no
        longer needs protection, in accordance with established procedures, is
        essential to the free flow of information."""),
])
root.children[19].children[1].children.extend([
    Node("""
        i. The Plan should include descriptions of and links to appropriate
        websites where the public can engage in existing participatory
        processes of your agency."""),
    Node("""
        ii. The Plan should include proposals for new feedback mechanisms,
        including innovative tools and practices that create new and easier
        methods for public engagement."""),
])
root.children[19].children[2].children.extend([
    Node("""
        i. The Plan should include proposals to use technology platforms to
        improve collaboration among people within and outside your agency.
        """),
    Node("""
        ii. The Plan should include descriptions of and links to appropriate
        websites where the public can learn about existing collaboration
        efforts of your agency."""),
    Node("""
        iii. The Plan should include innovative methods, such as prizes and
        competitions, to obtain ideas from and to increase collaboration with
        those in the private sector, non-profit, and academic communities.""")
])
root.children[19].children[3].children.extend([
    Node("""
        i. An overview of the initiative, how it addresses one or more of the
        three openness principles, and how it aims to improve agency
        operations;"""),
    Node("""
        ii. An explanation of how your agency engages or plans to engage the
        public and maintain dialogue with interested parties who could
        contribute innovative ideas to the initiative;"""),
    Node("""
        iii. If appropriate, identification of any partners external to your
        agency with whom you directly collaborate on the initiative; """),
    Node("""
        iv. An account of how your agency plans to measure improved
        transparency, participation, and/or collaboration through this
        initiative; and """),
    Node("""
        v. An explanation of the steps your agency is taking to make the
        initiative sustainable and allow for continued improvement. """)
])


root.children[9].children[0].req = Req(verbs=['shall'])
root.children[9].children[1].req = Req("a. ", ['shall', 'should'], [
    Keywords.digital_services, Keywords.it_transparency,
    Keywords.customer_services])
root.children[9].children[2].req = Req("b. ", ['should'], [
    Keywords.software, Keywords.digital_services, Keywords.it_transparency,
    Keywords.customer_services])
root.children[9].children[3].req = Req("c. ", ['should'],
                                       [Keywords.it_transparency])
root.children[9].children[4].req = Req("d. ", ['shall'], [
    Keywords.digital_services, Keywords.it_transparency, Keywords.governance])
root.children[9].children[5].req = Req("e. ", ['shall'], [
    Keywords.software, Keywords.digital_services, Keywords.it_transparency,
    Keywords.customer_services])
root.children[9].children[6].req = Req("f. ", ['shall'], [
    Keywords.software, Keywords.digital_services, Keywords.hardware,
    Keywords.it_transparency])
root.children[9].children[6].children[0].req = Req("i. ", keywords=[
    Keywords.software, Keywords.digital_services, Keywords.hardware,
    Keywords.it_transparency])
root.children[9].children[6].children[1].req = Req("ii. ", keywords=[
    Keywords.software, Keywords.digital_services, Keywords.hardware,
    Keywords.it_transparency])
root.children[9].children[6].children[2].req = Req("iii. ", keywords=[
    Keywords.software, Keywords.digital_services, Keywords.hardware,
    Keywords.it_transparency])
root.children[9].children[7].req = Req("g. ", ['shall'], [
    Keywords.digital_services, Keywords.it_transparency,
    Keywords.customer_services])
root.children[9].children[8].req = Req("h. ", ['shall'], [
    Keywords.digital_services, Keywords.it_transparency])
root.children[9].children[9].req = Req("i. ", ['shall'], [
    Keywords.it_transparency, Keywords.governance])
root.children[9].children[10].req = Req("j. ", ['shall'], [
    Keywords.digital_services, Keywords.it_transparency, Keywords.governance])
root.children[10].children[0].req = Req(verbs=['should'], keywords=[
    Keywords.digital_services, Keywords.it_transparency])
root.children[10].children[1].req = Req("a. ", ['shall'], [
    Keywords.it_transparency, Keywords.it_transparency, Keywords.governance,
    Keywords.finance])
root.children[10].children[2].req = Req("b. ", ['shall'], [
    Keywords.software, Keywords.digital_services, Keywords.hardware,
    Keywords.it_transparency, Keywords.finance])
root.children[10].children[3].req = Req("c. ", ['will'], [
    Keywords.it_transparency, Keywords.governance, Keywords.finance])
root.children[11].children[0].req = Req(verbs=['should'], keywords=[
    Keywords.it_pm, Keywords.digital_services, Keywords.it_transparency,
    Keywords.governance, Keywords.finance])
root.children[11].children[1].req = Req("a. ", ['shall'], [
    Keywords.it_pm, Keywords.software, Keywords.digital_services,
    Keywords.it_transparency, Keywords.governance])
root.children[11].children[2].req = Req("b. ", ['shall'], [
    Keywords.software, Keywords.digital_services, Keywords.it_transparency])
root.children[11].children[3].req = Req("c.", ['will'], [
    Keywords.digital_services, Keywords.it_transparency, Keywords.governance,
    Keywords.finance])
root.children[11].children[3].children[0].req = Req("i. ", keywords=[
    Keywords.digital_services, Keywords.it_transparency, Keywords.governance,
    Keywords.finance])
root.children[11].children[3].children[1].req = Req("ii. ", keywords=[
    Keywords.digital_services, Keywords.it_transparency, Keywords.governance,
    Keywords.finance])
root.children[11].children[3].children[2].req = Req("iii. ", keywords=[
    Keywords.digital_services, Keywords.it_transparency, Keywords.governance,
    Keywords.finance])
root.children[11].children[4].req = Req("d. ", ['will'],
                                        [Keywords.it_pm, Keywords.governance])
root.children[12].children[0].req = Req(verbs=['shall'], keywords=[
    Keywords.cybersec, Keywords.digital_services, Keywords.governance])
root.children[12].children[1].req = Req("a. ", ['will'],
                                        [Keywords.it_transparency])


print("""
<html>
<head>
    <style type="text/css">
        .req {
            background-color: #eee;
        }
        .verb {
            font-weight: bold;
            color: red;
        }
        .no-req {
            color: darkgrey;
        }
        ol {
            list-style: none;
        }
    </style>
</head>
<body>
""")
print(root.templated(2))
print("""
</body>
</html>
""")
