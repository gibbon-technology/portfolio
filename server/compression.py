import os
import sys
from PIL import Image

file = sys.argv[1]
file_quality = int(sys.argv[2])
size = int(sys.argv[3])
name = sys.argv[4]
file_type = sys.argv[5]

optimizedFile = os.path.join(os.getcwd(), 'ImageCompressor', f'{name}_{size}px.{file_type}')

img_compression = Image.open(file)
img_compression.thumbnail((size, size))

img_compression.save(optimizedFile, optimize=True, quality=file_quality)

originalFileSize = round(os.stat(file).st_size / 1024)
newImageSize = round(os.stat(optimizedFile).st_size / 1024)

calc_difference = round(
((originalFileSize - newImageSize) / newImageSize) * 100
 )

print(f'{originalFileSize}_{newImageSize}', end='')
