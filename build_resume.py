"""Generate ryan-yousefi-resume.pdf using fpdf2."""
from fpdf import FPDF
from fpdf.enums import XPos, YPos

DARK   = (15,  15,  35)
PURPLE = (80,  55, 165)
BODY   = (55,  55,  55)
MUTED  = (110, 110, 120)
RULE   = (190, 175, 240)
BG     = (248, 246, 255)

NL = dict(new_x=XPos.LMARGIN, new_y=YPos.NEXT)

class CV(FPDF):
    def footer(self):
        self.set_y(-13)
        self.set_font('Helvetica', 'I', 7.5)
        self.set_text_color(*MUTED)
        self.cell(0, 6, 'Ryan Yousefi   |   ryanryousefi@gmail.com   |   linkedin.com/in/ryan-yousefi/', align='C')

def hline(pdf, gap_before=2, gap_after=3, color=RULE, lw=0.35):
    pdf.ln(gap_before)
    pdf.set_draw_color(*color)
    pdf.set_line_width(lw)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
    pdf.ln(gap_after)

def section(pdf, title):
    pdf.ln(5)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.set_text_color(*PURPLE)
    pdf.set_fill_color(*BG)
    pdf.cell(0, 6, f'  {title.upper()}', fill=True, **NL)
    hline(pdf, gap_before=0, gap_after=3, lw=0.25)

def body(pdf, text, size=9.5, color=BODY):
    pdf.set_font('Helvetica', '', size)
    pdf.set_text_color(*color)
    pdf.multi_cell(0, 5.2, text)

def bullet(pdf, text):
    pdf.set_font('Helvetica', '', 9.5)
    pdf.set_text_color(*BODY)
    pdf.set_x(pdf.l_margin + 4)
    pdf.multi_cell(pdf.epw - 4, 5.2, f'-  {text}')
    pdf.ln(0.5)

def job(pdf, product, studio, role, dates, chain=None):
    chain_str = f'  ({chain})' if chain else ''
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 6.5, product, **NL)
    pdf.set_font('Helvetica', 'B', 9.5)
    pdf.set_text_color(*PURPLE)
    pdf.cell(pdf.epw * 0.62, 5.5, role)
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(pdf.epw * 0.38, 5.5, dates, align='R', **NL)
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5, f'{studio}{chain_str}', **NL)
    pdf.ln(2.5)

# ── Build ────────────────────────────────────────────────────────────────────
pdf = CV(format='Letter')
pdf.set_margins(18, 18, 18)
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# NAME
pdf.set_font('Helvetica', 'B', 30)
pdf.set_text_color(*DARK)
pdf.cell(0, 13, 'Ryan Yousefi', **NL)

pdf.set_font('Helvetica', '', 12)
pdf.set_text_color(*PURPLE)
pdf.cell(0, 6.5, 'Crypto Gaming Growth & Content Leader', **NL)

hline(pdf, gap_before=3, gap_after=4, color=(130, 100, 210), lw=0.9)

# CONTACT
pdf.set_font('Helvetica', '', 9)
pdf.set_text_color(*MUTED)
contact = 'ryanryousefi@gmail.com  |  linkedin.com/in/ryan-yousefi/  |  x.com/RyanRYousefi  |  United States & Vietnam'
pdf.cell(0, 5, contact, **NL)
pdf.ln(5)

# SUMMARY
section(pdf, 'Professional Summary')
body(pdf,
    'Since 2022, I have led teams driving over $1B in combined transaction volume across wagering, fees, '
    'NFT sales, and partnerships, working across nearly every major blockchain. I bring more than 20 years '
    'of experience in content and management, including 5+ years focused specifically on crypto gaming.\n\n'
    'Self-driven and highly motivated, with a career shaped by navigating multiple crypto cycles, gaining '
    'real, hard-earned experience through both market highs and downturns. Battle-tested and calm under '
    'pressure, I approach challenges with a clear, solutions-first mindset. I have built strong '
    'relationships with players and industry leaders, earning a reputation as a trusted operator who can '
    'align communities, partners, and teams to execute at a high level.')
pdf.ln(2)

# EXPERIENCE
section(pdf, 'Experience')

job(pdf,
    product='Photo Finish(TM) LIVE',
    studio='Third Time Games',
    role='Director of Communications',
    dates='September 2022 - Present',
    chain='Solana')
bullet(pdf, 'Founding team member of Photo Finish(TM) LIVE, the #1 all-time revenue game on Solana.')
bullet(pdf, 'Led team that secured Official Gaming Partner status of the Kentucky Derby.')
bullet(pdf, 'Executed multi-year campaigns with NBC Sports across television and digital platforms.')
bullet(pdf, 'Led activations with dozens of crypto industry partners at conferences globally.')
bullet(pdf, 'Organized and led in-person events and conferences across multiple countries.')
pdf.ln(2)
pdf.set_font('Helvetica', 'B', 9)
pdf.set_text_color(*PURPLE)
pdf.cell(pdf.epw / 3, 5.5, '$100M+  Racing Volume')
pdf.cell(pdf.epw / 3, 5.5, '$50M+  Breeding Volume', align='C')
pdf.cell(pdf.epw / 3, 5.5, '$25M+  Horse Purchases', align='R', **NL)
pdf.ln(5)

job(pdf,
    product='ZED RUN',
    studio='Virtually Human Studios',
    role='Content Director',
    dates='July 2021 - August 2022',
    chain='Polygon')
bullet(pdf, 'One of the first 10 employees at ZED RUN, a pioneering crypto horse racing game on Polygon.')
bullet(pdf, 'Directed content, social, EDM, and partnership strategy across all channels.')
bullet(pdf, 'Delivered campaigns generating millions in NFT sales and tens of millions in racing volume.')
bullet(pdf, 'Led community onboarding initiatives and global event activations.')
pdf.ln(2)
pdf.set_font('Helvetica', 'B', 9)
pdf.set_text_color(*PURPLE)
pdf.cell(0, 5, 'Partners: Netflix, Atari, Budweiser, NASCAR, Stella Artois, Victoria Racing Club', **NL)
pdf.ln(5)

# GENERAL WORK HISTORY
section(pdf, 'General Work History')

pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(*DARK)
pdf.cell(0, 6, 'Content Experience', **NL)
body(pdf,
    'Twenty-plus years publishing content across platforms such as ESPN, MiamiDolphins.com, UPROXX, '
    'Miami New Times, Phoenix New Times, Talk Media Inc, Pro Football Sports Network, and many more.')
pdf.ln(4)

pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(*DARK)
pdf.cell(0, 6, 'Business Management Experience', **NL)
pdf.ln(1)
job(pdf,
    product='Affordable Rehab, Therapy Center',
    studio='Healthcare',
    role='Director of Operations',
    dates='2007 - 2021')

# KEY METRICS
section(pdf, 'Key Metrics')
metrics = [
    ('$1B+',   'Combined transaction volume across wagering, fees, NFT sales, and partnerships since 2022'),
    ('20+',    'Years in content and management'),
    ('5+',     'Years focused on crypto gaming'),
    ('$100M+', 'Racing volume generated at Photo Finish(TM) LIVE on Solana'),
]
for val, desc in metrics:
    pdf.set_font('Helvetica', 'B', 9.5)
    pdf.set_text_color(*PURPLE)
    pdf.cell(22, 5.5, val)
    pdf.set_font('Helvetica', '', 9.5)
    pdf.set_text_color(*BODY)
    pdf.multi_cell(0, 5.5, desc)
    pdf.ln(0.5)
pdf.ln(2)

# EDUCATION
section(pdf, 'Education')
pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(*DARK)
pdf.cell(pdf.epw * 0.65, 6, "Master's Degree in Business Management")
pdf.set_font('Helvetica', '', 9)
pdf.set_text_color(*MUTED)
pdf.cell(pdf.epw * 0.35, 6, 'Western Governors University', align='R', **NL)

pdf.set_font('Helvetica', 'B', 10)
pdf.set_text_color(*DARK)
pdf.cell(pdf.epw * 0.65, 6, "Bachelor's Degree")
pdf.set_font('Helvetica', '', 9)
pdf.set_text_color(*MUTED)
pdf.cell(pdf.epw * 0.35, 6, 'Western Governors University', align='R', **NL)
pdf.ln(2)

# TOOLS
section(pdf, 'Tools & Technologies')
tools = [
    ('Productivity',        'Microsoft Office, Google Workspace'),
    ('Content & Marketing', 'WordPress, Webflow, Notion, Mailchimp, Klaviyo, Hootsuite, Buffer, Canva, Adobe Creative Suite'),
    ('Web & Development',   'GitHub, Vercel, HTML, CSS, GoDaddy, Cloudflare'),
    ('AI & Automation',     'ChatGPT, Claude Code, Midjourney, DALL-E, Grok'),
    ('Analytics',           'Google Analytics, Search Console, Ahrefs, SEMrush, Hotjar'),
    ('Project Management',  'Slack, Trello, Asana, Monday.com, Jira'),
]
for cat, items in tools:
    pdf.set_font('Helvetica', 'B', 9.5)
    pdf.set_text_color(*DARK)
    pdf.cell(44, 5.5, cat)
    pdf.set_font('Helvetica', '', 9.5)
    pdf.set_text_color(*BODY)
    pdf.multi_cell(0, 5.5, items)
    pdf.ln(0.5)

out = '/Users/ryanyousefi/Desktop/ryanyousefi-cv/ryan-yousefi-resume.pdf'
pdf.output(out)
print(f'Saved: {out}  ({pdf.page} page(s))')
