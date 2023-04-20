import pdfplumber
import re
import spacy

nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
    return text

def extract_email(text):
    email = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
    return email[0] if email else None

def extract_phone_number(text):
    phone = re.findall(r'\+?[\d\-\(\)\s]{7,15}', text)
    return phone[0] if phone else None

def extract_skills(text):
    skills = nlp(text)
    skills_list = [token.text for token in skills if token.pos_ == "NOUN"]
    return skills_list

def extract_name(text):
    nlp_text = nlp(text)
    name = None
    for entity in nlp_text.ents:
        if entity.label_ == 'PERSON':
            name = entity.text
            break
    return name

def extract_hyperlinks_from_pdf(text):
    pdf_links = []

    if text:
        # Regular expression to match URLs
        url_pattern = re.compile(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
        urls = re.findall(url_pattern, text)

        if urls:
            pdf_links.extend(urls)

    # Extracting links from annotations
    return pdf_links

def extract_information_from_resume(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    email = extract_email(text)
    phone_number = extract_phone_number(text)
    skills = extract_skills(text)
    name = extract_name(text)
    links = extract_hyperlinks_from_pdf(text)
    
    return {
        'Name': name,
        'Email': email,
        'Phone number': phone_number,
        'Skills': skills,
        'Links' : links
    }

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python pdf_parser.py <path_to_resume.pdf>")
        sys.exit(1)
    pdf_path = sys.argv[1]
    resume_information = extract_information_from_resume(pdf_path)
    print(resume_information)

