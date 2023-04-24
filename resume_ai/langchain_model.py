from langchain.llms import OpenAI
import os


os.environ["OPENAI_API_KEY"] = "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"

llm = OpenAI(model_name="text-ada-001", n=2, best_of=2)
output = llm("tell me a joke")
print(output)