#!/bin/bash
# publish.sh — Create a post and push to GitHub for auto-deploy
# Usage: ./publish.sh <slug> <title> <category> <content_file> [access_code]
# Example: ./publish.sh crypto-march "Crypto Market March 2026" "market-analysis" /tmp/post.html
# Example with access code: ./publish.sh crypto-march "Crypto Market March 2026" "market-analysis" /tmp/post.html mysecretcode

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
SLUG="$1"
TITLE="$2"
CATEGORY="$3"
CONTENT_FILE="$4"
ACCESS_CODE="${5:-}"
DATE=$(date +"%B %d, %Y")
FILENAME="$SLUG.html"

if [ -z "$SLUG" ] || [ -z "$TITLE" ] || [ -z "$CATEGORY" ] || [ -z "$CONTENT_FILE" ]; then
    echo "Usage: $0 <slug> <title> <category> <content_file> [access_code]"
    exit 1
fi

if [ ! -f "$CONTENT_FILE" ]; then
    echo "ERROR: Content file not found: $CONTENT_FILE"
    exit 1
fi

cd "$REPO_DIR"
git pull --rebase origin main 2>/dev/null || true

# Read template and content
TEMPLATE=$(cat posts/_template.html)
CONTENT=$(cat "$CONTENT_FILE")

# Build the post HTML
POST_HTML="${TEMPLATE}"
POST_HTML="${POST_HTML//\{\{TITLE\}\}/$TITLE}"
POST_HTML="${POST_HTML//\{\{DATE\}\}/$DATE}"
POST_HTML="${POST_HTML//\{\{CATEGORY\}\}/$CATEGORY}"
POST_HTML="${POST_HTML//\{\{ACCESS_CODE\}\}/$ACCESS_CODE}"

# Content replacement needs special handling (may contain special chars)
python3 -c "
import sys
template = open('posts/_template.html').read()
content = open('$CONTENT_FILE').read()
result = template.replace('{{TITLE}}', '''$TITLE''')
result = result.replace('{{DATE}}', '''$DATE''')
result = result.replace('{{CATEGORY}}', '''$CATEGORY''')
result = result.replace('{{ACCESS_CODE}}', '''$ACCESS_CODE''')
result = result.replace('{{CONTENT}}', content)
with open('posts/$FILENAME', 'w') as f:
    f.write(result)
"

echo "Created posts/$FILENAME"

# Update the index.html with the new post entry
IS_LOCKED=""
if [ -n "$ACCESS_CODE" ]; then
    IS_LOCKED='<span class="tag locked">🔒</span>'
fi

NEW_ENTRY="<li class=\"post-item\"><a href=\"/posts/$FILENAME\"><div class=\"post-title\">$TITLE</div><div class=\"post-meta\">$DATE<span class=\"tag\">$CATEGORY</span>$IS_LOCKED</div></a></li>"

# Insert new post at the top of the list (after POSTS_START marker)
python3 -c "
idx = open('index.html').read()
marker = '<!-- POSTS_START -->'
empty = '<li class=\"empty-state\">No posts yet. Check back soon.</li>'
entry = '''$NEW_ENTRY'''
# Remove empty state if present
idx = idx.replace(empty, '')
# Insert after marker
idx = idx.replace(marker, marker + '\n            ' + entry)
with open('index.html', 'w') as f:
    f.write(idx)
"

echo "Updated index.html"

# Commit and push
git add posts/"$FILENAME" index.html
git commit -m "Post: $TITLE"
git push origin main

echo ""
echo "✅ Published: https://bombadillo-posts.pages.dev/posts/$FILENAME"
if [ -n "$ACCESS_CODE" ]; then
    echo "🔒 Access code: $ACCESS_CODE"
fi
