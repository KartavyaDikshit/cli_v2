

import re
import os

with open("C:/Users/User/cli_v2/copy.html", "r", encoding="utf-8") as f:
    html_content = f.read()

image_urls = set()

# Regex for src attributes in img tags
img_src_matches = re.findall(r'<img[^>]*src="([^"]*)"', html_content)
for url in img_src_matches:
    if url.startswith('https://www.thebrainyinsights.com/images/'):
        image_urls.add(url)

# Regex for url() in style attributes
style_url_matches = re.findall(r"url\('([^']*)'\)", html_content)
for url in style_url_matches:
    if url.startswith('https://www.thebrainyinsights.com/images/'):
        image_urls.add(url)

with open("C:/Users/User/cli_v2/image_urls.txt", "w") as f:
    for url in sorted(list(image_urls)):
        f.write(url + "\n")

