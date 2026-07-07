import base64

# Read and encode SVG
with open('header.svg', 'rb') as f:
    svg_data = f.read()
    
base64_data = base64.b64encode(svg_data).decode('utf-8')

# Write img tag to file
img_tag = f'<img src="data:image/svg+xml;base64,{base64_data}" width="100%"/>'

with open('encoded_img.txt', 'w', encoding='utf-8') as f:
    f.write(img_tag)

print("SUCCESS")
