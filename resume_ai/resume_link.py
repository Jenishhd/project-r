# The import name for this library is fitz
import fitz

# Create a document object
doc = fitz.open('/Users/jenishthanki/Downloads/Jenish_Thanki_Resume_Updated.pdf')  # or fitz.Document(filename)

# Extract the number of pages (int)
#print(doc.page_count)

# the metadata (dict) e.g., the author,...
#print(doc.metadata)

# Get the page by their index
page = doc.load_page(0)
 # or page = doc[0]

# read a Page

# Render and save the page as an image
pix = page.get_pixmap() 
pix.save(f"page-{page.number}.png")


# get the links on all pages
for i in range(doc.page_count):
  page = doc.load_page(i)
  link = page.get_links()
  links = [d['uri'] for d in link if 'uri' in d]
  print(links)
