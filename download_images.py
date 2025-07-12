
import requests
import os

image_urls_file = "C:/Users/User/cli_v2/image_urls.txt"
public_images_dir = "C:/Users/User/cli_v2/public/images"

with open(image_urls_file, "r") as f:
    image_urls = f.read().splitlines()

for url in image_urls:
    local_path = url.replace("https://www.thebrainyinsights.com/images", public_images_dir)
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(local_path, 'wb') as out_file:
            for chunk in response.iter_content(chunk_size=8192):
                out_file.write(chunk)
        print(f"Downloaded {url} to {local_path}")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading {url}: {e}")
