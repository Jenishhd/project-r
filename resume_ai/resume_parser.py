import pdfplumber
import re
import spacy
import fitz
from langchain.document_loaders import PyMuPDFLoader
from langchain.llms import OpenAI
import os


def extract_hyperlinks_from_pdf(path):
    # Create a document object
    doc = fitz.open('/Users/jenishthanki/Downloads/Jenish_Thanki_Resume_Updated.pdf')  # or fitz.Document(filename)
    links = []
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
    return links
    
def pdf_loader(path):
    loader = PyMuPDFLoader(path)
    data = loader.load()
    return data



def get_resume_json_prompt(resume_data):
    prompt = """
                    Take this parsed input for a resume as an input """ + resume_data + """\n
                Based on this resume return a json dictionary with the fields of personal information, soft skills, technical skills, years of experience, past companies or organizations worked for, hyperlinks, projects, education, and a career narrative. 
                {
                personal_info: [],
                soft_skills:[],
                technical_skills:[],
                yrs_of_exp: ,
                companies_worked_at/organizations : [],
                hyperlinks: [],
                projects: [],
                education: [],
                narrative:,
                url/links: 
                } 
            """
    return prompt

#def parse_git_code(username):



if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python pdf_parser.py <path_to_resume.pdf>")
        sys.exit(1)
    pdf_path = sys.argv[1]
    result = get_resume_json_prompt(str(pdf_loader(pdf_path)))
    llm = OpenAI(model_name="text-davinci-003", n=2, best_of=2)
    output = llm.get_num_tokens(result)
    print(output)

