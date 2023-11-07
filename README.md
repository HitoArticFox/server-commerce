#SERVER-COMMERCE

Rutas:
        ->Usuarios:
        -> /
        ->/api/users // POST // Crea un usuario
        ->/api/users/:users_id // GET //Busca un usuario por su ID
        ->/api/users/:users_id // PUT //Cambia informacion de un usuario por su ID
        ->/api/users/:users_id // DELETE //Elimina un usuario por su ID

    ->Productos:
    -> /
    ->/api/products // POST //Crea un producto
    ->/api/products/:products_id // GET //Busca un producto por su ID
    ->/api/products/:products_id // PUT //Cambia unfirmacion del producto
    ->/api/products/:products_id // DELETE //Borra un producto