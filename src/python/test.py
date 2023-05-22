file = open('stock.csv', 'r+')

# Ejercicio a:
# Obtené la lista de cada línea sin los "\n" al final de cada elemento de la
# lista.
products = file.read().splitlines()

for product in products:
    # Ahora hacemos una sublista de cada producto donde el delimitador entre
    # un elemento de la lista y el otro sea el carácter punto y coma (;),
    # por lo que de: lapiceras;34512;50;120
    # pasaría a ser: ['lapiceras', '34512', '50', '120']
    product_details = product.split(';')
    # Para mayor legibilidad, asigno cada elemento de la nueva lista su propia
    # variable.
    name = product_details[0]
    code = product_details[1]
    price = product_details[2]
    stock = product_details[3]

    # Y ahora imprimimos los productos en forma de lista (no lista de Python,
    # sino una lista lista jeje).
    print(f'Nombre del producto: {name}\nCódigo del producto: {code}\nPrecio por unidad: {price}\nStock: {stock}\n')

# Ejercicio b:
def add_product(product_info):
    # Primero reviso que lo que pasaron a la función es un diccionario.
    if type(product_info) != dict:
        print(f'Error: se esperaba un diccionario ("dict") pero se recibió un "{type(product_info).__name__}".')
        return

    # Obtengo los valores del diccionario y los pongo en una lista.
    product_data = list(product_info.values())
    # Para que el código sea más legible, asigno cada valor a una variable.
    name = product_data[0]
    code = product_data[1]
    price = product_data[2]
    stock = product_data[3]

    file.write(f'\n{name};{code};{price};{stock}')

sheet = {'Nombre': 'Hojas A4', 'Código': 35662, 'precio': 600, 'stock': 45}

add_product(sheet)

file.close()