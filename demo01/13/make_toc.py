from display_text import root, to_str


with open('toc/toc.html', 'w') as toc:
    toc.write("""
        <html>
            <head>
                <style type="text/css">
                    ol {
                        list-style: none;
                        padding-left: 0;
                    }
                    ol li {
                        border-bottom: 1px solid grey;
                    }
                </style>
            </head>
            <body>
        """)
    toc.write("<ol>\n")
    for pidx, policy in enumerate(root.children):
        toc.write("<li><a href='{0}.html' target='main'>{1}</a></li>".format(
            pidx, policy.text))
        with open('toc/{0}.html'.format(pidx), 'w') as page:
            page.write("""
                <html>
                    <head>
                        <style type="text/css">
                            .context {{
                                color: lightgrey;
                            }}
                            strong {{
                                color: red;
                                font-weight: bold;
                            }}
                        </style>
                    </head>
                <body>{0}</body>
                </html>""".format(
                ''.join(to_str(child) for child in policy.children)))
    toc.write("</body></html>")
