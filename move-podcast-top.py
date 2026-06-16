import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/posts.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

TARGET = "how-to-motivate-your-child-to-practice-soccer-at-home"

# Markers to find and extract the podcast section
PODCAST_START = '\n<div style="background:#F0F6FF;border-radius:16px;'
PODCAST_END = '\n</div>\n'  # closing tag of the podcast div

# Insertion point: right after the opening intro (after first <hr>)
INSERT_AFTER = '<hr style="border:none;border-top:2px solid #E5E7EB;margin:36px 0;" />\n\n'

for post in posts:
    if post['slug'] != TARGET:
        continue

    content = post['content']

    # 1. Extract the podcast section
    start_idx = content.find(PODCAST_START)
    if start_idx == -1:
        print("ERROR: Could not find podcast section start")
        break

    # Find the closing </div>\n that belongs to this outer div
    # The podcast section has nested divs — count depth
    search_from = start_idx + len(PODCAST_START)
    depth = 1
    i = search_from
    end_idx = -1
    while i < len(content):
        open_tag = content.find('<div', i)
        close_tag = content.find('</div>', i)
        if close_tag == -1:
            break
        if open_tag != -1 and open_tag < close_tag:
            depth += 1
            i = open_tag + 4
        else:
            depth -= 1
            if depth == 0:
                end_idx = close_tag + len('</div>')
                break
            i = close_tag + 6

    if end_idx == -1:
        print("ERROR: Could not find podcast section end")
        break

    # Include the trailing newline after </div>
    if content[end_idx:end_idx+1] == '\n':
        end_idx += 1

    podcast_block = content[start_idx:end_idx]
    print(f"Extracted podcast block: chars {start_idx}–{end_idx} ({len(podcast_block)} chars)")

    # 2. Remove it from its current position
    content = content[:start_idx] + content[end_idx:]

    # 3. Insert it after the first <hr> (right after the opening story)
    insert_pos = content.find(INSERT_AFTER)
    if insert_pos == -1:
        print("ERROR: Could not find insertion anchor")
        break
    insert_pos += len(INSERT_AFTER)

    content = content[:insert_pos] + podcast_block + '\n' + content[insert_pos:]
    print("Podcast section moved to top.")

    post['content'] = content
    print("New content length:", len(content))
    break

with open('src/data/posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)
print("posts.json saved.")
