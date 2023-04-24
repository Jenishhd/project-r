import requests

def get_user_repos(username):
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error fetching repositories for user {username}: {response.status_code} {response.text}")

def get_repo_contents(username, repo_name, path=''):
    url = f"https://api.github.com/repos/{username}/{repo_name}/contents/{path}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error fetching contents for repo {repo_name}: {response.status_code} {response.text}")

def get_file_contents(file_url):
    response = requests.get(file_url)
    if response.status_code == 200:
        return response.text
    else:
        raise Exception(f"Error fetching file contents: {response.status_code} {response.text}")

def process_contents(username, repo_name, contents, result):
    for item in contents:
        if item['type'] == 'file':
            if item['name'].split('.')[-1] in {'py', 'js', 'cpp', 'c', 'java', 'rb', 'go', 'rs', 'php', 'swift'}:
                file_contents = get_file_contents(item['download_url'])
                result.append((repo_name, item['path'], file_contents))
            else:
                pass
        elif item['type'] == 'dir':
            dir_contents = get_repo_contents(username, repo_name, item['path'])
            process_contents(username, repo_name, dir_contents, result)

def get_code_from_user_repos(username):
    repos = get_user_repos(username)
    result = []
    for repo in repos:
        contents = get_repo_contents(username, repo['name'])
        process_contents(username, repo['name'], contents, result)
    return result

if __name__ == "__main__":
    git_username = input("Enter the GitHub username: ")
    code_data = get_code_from_user_repos(git_username)
    txt_file = open("repo_store.txt", "rw")
    txt_file.write(code_data)
    txt_file.close()