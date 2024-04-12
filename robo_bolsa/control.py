import requests
from bs4 import BeautifulSoup

# URL da página que você quer raspar
url = 'https://www.google.com/finance/'

# Fazendo a solicitação GET
r = requests.get(url)

# Criando o objeto BeautifulSoup
soup = BeautifulSoup(r.content, 'html.parser')

# Encontrando todas as ocorrências dos nomes dos índices
classes_name = soup.find_all(class_="pKBk1e")

# Encontrando todas as ocorrências dos preços dos índices
classes_price = soup.find_all(class_="YMlKec")

# Encontrando todas as ocorrências das porcentagens dos índices
classes_poit = soup.find_all(class_="SEGxAb")

classes_porcent = soup.find_all(class_="JwB6zf V7hZne")

# Iterando sobre as ocorrências para imprimir os resultados
for name, price, porcent, point in zip(classes_name, classes_price, classes_porcent, classes_poit):
    print("Nome:", name.text)
    print("Preço:", price.text)
    print("Porcentagem:", porcent.text)
    print("Pontos:", point.text)
    print()
