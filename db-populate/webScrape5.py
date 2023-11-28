import requests
import shutil
import random
from urllib.parse import urlencode
from bs4 import BeautifulSoup




headers = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
}
searchUrl = 'https://www.google.com/search?'

def get_google_image_list(query:str):
    url = searchUrl +  urlencode({'q':query,"ijn":0,"start":0,"tbs":"","tbm":"isch"})
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, "html.parser")
    images = soup.find_all('img',{"data-src":True,"alt":True})
    imgUrls = list(map(lambda img:img.get("data-src"), filter(lambda img: len(img.get("alt")),images)))
    return imgUrls


payload = {
    "query": "query AllProduct {\n  allProduct {\n    code\n    thumbnail\n    name\n    id\n  }\n}\n",
    "variables": {},
    "operationName": "AllProduct"
}




savePath = "/home/teresol/dev/myDev/selfLearn1/js/sequelize/project-1/server/assets/"

def save_photo(product):
    imgUrls= get_google_image_list(product.get('name') + " product")
    randomImage = random.choice(imgUrls)
    print("Rand Img:",randomImage)
    r = requests.get(randomImage, stream=True)
    if r.status_code == 200:
        ext = r.headers['content-type'].split('/')[-1]
        fname = product["code"]+"."+ext
        with open(savePath+fname, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)
        

        #Update DB

        query = {
            "query": "mutation Mutation($updateProductId: Int!, $thumbnail: String) {\n  updateProduct(id: $updateProductId, thumbnail: $thumbnail)\n}",
            "variables": {
            "updateProductId": product.get("id"),
            "thumbnail": fname
            },
            "operationName": "Mutation"
        }
        res = requests.post("http://127.0.0.1:4000/graphql",json=query)
        print(res.json())




apiRes = requests.post("http://127.0.0.1:4000/graphql",json=payload)
products = apiRes.json()["data"]["allProduct"]
product = products[0]
print(product)
save_photo(product)