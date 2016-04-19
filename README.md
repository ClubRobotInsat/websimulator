# websimulator

## Format des messages

### Creer un object :
    {
      "id": 10,
      "type": "newmodel",
      "modelName": "model",
      "matrix": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      "color": "0x00FF00"
    }

### Bouger un object :
    {
      "id": 10,
      "type": "move",
      "matrix": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

### Supprimer un object :
    {
      "id": 10,
      "type": "remove"
    }
### Creer un pave
    {
      "id": 10,
      "type": "newcuboid",
      "matrix": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
### Creer un cylinder
    {
      "id": 10,
      "type": "newcylinder",
      "radius": 10,
      "height": 20,
      "matrix": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

### Afficher un message dans la console
    {
      "type": "log",
      "message": "Hey sup ?"
    
    }

