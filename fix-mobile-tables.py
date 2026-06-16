import json, re

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET_SLUG = 'why-is-youth-soccer-so-expensive-supply-demand-american-culture'

# Wrap all tables in a responsive scroll container
# The tables already have overflow-x:auto on their wrapper div in some cases,
# but let's make sure ALL tables get it by wrapping any <table that isn't already wrapped

def make_tables_scrollable(content):
    # Find tables that are inside a div with overflow-x:auto — already fine
    # Find bare <table> or tables inside divs WITHOUT overflow-x:auto and wrap them
    # Simple approach: replace every <table with a scrollable wrapper if not already wrapped

    # Replace the existing table wrappers (they have overflow-x:auto already from the template)
    # But check if the 4-column "Country" table and 5-column "Sport" table have it

    # These tables are the ones the user flagged — they have lots of columns
    # Add min-width to the table itself so it scrolls rather than squishes

    # Find all <table> tags and add min-width:600px to their style
    content = re.sub(
        r'<table style="(width:100%;border-collapse:collapse;)"',
        r'<table style="\1min-width:600px;"',
        content
    )
    return content

for post in posts:
    if post.get('slug') == TARGET_SLUG:
        original = post['content']
        post['content'] = make_tables_scrollable(original)
        changed = post['content'] != original
        print(f"Tables updated: {changed}")
        # Count how many tables were modified
        count = post['content'].count('min-width:600px')
        print(f"Tables with min-width: {count}")

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
