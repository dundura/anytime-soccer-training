import json

with open('src/data/pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Fix video-btn color across all getting started pages - add color: #ffffff !important
for page in pages:
    if 'video-btn' in page.get('content', ''):
        # Replace video-btn color line to add !important
        page['content'] = page['content'].replace(
            'color: var(--white);',
            'color: #ffffff !important;'
        )

# Find the 2015-legacy-girls template
template = None
for page in pages:
    if page['slug'] == '2015-legacy-girls-getting-started':
        template = page['content']
        break

if not template:
    print("Template not found!")
    exit(1)

# Create 14G RED CTX page
content_14g = template.replace('2015 Legacy Girls', 'Lonestar Soccer Club 14G Red CTX')
content_14g = content_14g.replace('2015legacy11162025', 'lonestar03112026')

# Create 14B BLACK CTX page
content_14b = template.replace('2015 Legacy Girls', 'Lonestar Soccer Club 14B Black CTX')
content_14b = content_14b.replace('2015legacy11162025', 'lonestar03112026')

# Create combined page - modify the team info box to show both teams
combined_team_box = '''<div style="background: linear-gradient(135deg, #0F3154 0%, #1a4270 100%); border-radius: 12px; padding: 28px 32px; margin-bottom: 32px; color: #fff; box-shadow: 0 4px 20px rgba(15, 49, 84, 0.2);">\\r\\n      <div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; align-items: center;">\\r\\n        <div style="text-align: center; flex: 1; min-width: 200px;">\\r\\n          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0.7; margin-bottom: 6px;">Teams</div>\\r\\n          <div style="font-family: 'Montserrat', sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 8px;">Lonestar Soccer Club 14G Red CTX</div>\\r\\n          <div style="font-family: 'Montserrat', sans-serif; font-size: 1.2rem; font-weight: 700;">Lonestar Soccer Club 14B Black CTX</div>\\r\\n        </div>\\r\\n        <div style="width: 1px; height: 50px; background: rgba(255,255,255,0.2);"></div>\\r\\n        <div style="text-align: center; flex: 1; min-width: 200px;">\\r\\n          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0.7; margin-bottom: 6px;">Team Code</div>\\r\\n          <div style="font-family: 'Montserrat', sans-serif; font-size: 1.4rem; font-weight: 700; color: #DC373E; background: #fff; padding: 8px 20px; border-radius: 8px; display: inline-block;">lonestar03112026</div>\\r\\n        </div>\\r\\n      </div>\\r\\n    </div>'''

# Build combined content from template
content_combined = template

# Replace the original team info box with the combined one
# Find the team info box in the template (between the two main divs)
import re
old_team_box_pattern = r'<div style="background: linear-gradient\(135deg, #0F3154 0%, #1a4270 100%\);.*?</div>\s*</div>\s*</div>'
# Simpler approach: replace the team name and code
content_combined = content_combined.replace(
    '<div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0.7; margin-bottom: 6px;">Team Name</div>\r\n          <div style="font-family: \'Montserrat\', sans-serif; font-size: 1.4rem; font-weight: 700;">2015 Legacy Girls</div>',
    '<div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0.7; margin-bottom: 6px;">Teams</div>\r\n          <div style="font-family: \'Montserrat\', sans-serif; font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Lonestar Soccer Club 14G Red CTX</div>\r\n          <div style="font-family: \'Montserrat\', sans-serif; font-size: 1.15rem; font-weight: 700;">Lonestar Soccer Club 14B Black CTX</div>'
)
content_combined = content_combined.replace('2015legacy11162025', 'lonestar03112026')

# Add the three new pages
pages.append({
    "id": "9901",
    "title": "Lonestar 14G Red CTX Getting Started",
    "slug": "lonestar-14g-getting-started",
    "date": "Wed, 12 Mar 2026 12:00:00 +0000",
    "content": content_14g,
    "excerpt": "",
    "categories": [],
    "tags": [],
    "thumbnailId": "",
    "featuredImage": ""
})

pages.append({
    "id": "9902",
    "title": "Lonestar 14B Black CTX Getting Started",
    "slug": "lonestar-14b-getting-started",
    "date": "Wed, 12 Mar 2026 12:00:00 +0000",
    "content": content_14b,
    "excerpt": "",
    "categories": [],
    "tags": [],
    "thumbnailId": "",
    "featuredImage": ""
})

pages.append({
    "id": "9903",
    "title": "Lonestar Soccer Club Getting Started",
    "slug": "lonestar-getting-started",
    "date": "Wed, 12 Mar 2026 12:00:00 +0000",
    "content": content_combined,
    "excerpt": "",
    "categories": [],
    "tags": [],
    "thumbnailId": "",
    "featuredImage": ""
})

with open('src/data/pages.json', 'w', encoding='utf-8') as f:
    json.dump(pages, f, indent=2, ensure_ascii=False)

print("Done! Added 3 Lonestar pages and fixed video-btn color.")
print("URLs:")
print("  - /lonestar-14g-getting-started")
print("  - /lonestar-14b-getting-started")
print("  - /lonestar-getting-started (combined)")
