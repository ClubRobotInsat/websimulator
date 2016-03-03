### websimulator

## Format des messages

#Creer un object :
    {
      "id": 10,
      "type": "new",
      "modelName": "model",
      "position": {
        "x": 10,
        "y": 10,
        "z": 10
      },
      "rotation": 10,
      "color": "0x00FF00"
    }

# Bouger un object :
    {
      "id": 10,
      "type": "move",
      "position": {
        "x": 10,
        "y": 10,
        "z": 10
      },
      "rotation": 10,
    }

# Supprimer un object :
    {
      "id": 10,
      "type": "remove"
    }
