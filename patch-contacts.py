"""
patch-contacts.py
Run this once from the root of your FleeCon project:

    python patch-contacts.py

It updates index.html with the real phone number, email,
social links, and adds the EmailJS script tag.
"""

import re, os

PHONE      = '254710678147'
WA_NUMBER  = '+254 710 678 147'
EMAIL      = 'davidkiarie6@gmail.com'
SOCIAL_FB  = 'https://www.facebook.com'
SOCIAL_IG  = 'https://www.instagram.com'

files = ['index.html']

for fname in files:
    if not os.path.exists(fname):
        print(f'SKIP (not found): {fname}')
        continue

    html = open(fname, encoding='utf-8').read()

    html = html.replace('254700000000', PHONE)
    html = html.replace('+254 700 000 000', WA_NUMBER)
    html = html.replace('hello@fleecon.co.ke', EMAIL)

    # Social links
    html = re.sub(r'href="https://www\.facebook\.com[^"]*"', f'href="{SOCIAL_FB}"', html)
    html = re.sub(r'href="https://www\.instagram\.com[^"]*"', f'href="{SOCIAL_IG}"', html)

    # EmailJS CDN (before </head>)
    if 'emailjs' not in html:
        html = html.replace(
            '</head>',
            '  <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>\n</head>'
        )

    open(fname, 'w', encoding='utf-8').write(html)
    print(f'Patched: {fname}')

print('Done.')