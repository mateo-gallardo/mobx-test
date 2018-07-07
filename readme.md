Con el POSTMAN hacer un POST a https://fcm.googleapis.com/fcm/send
Headers:
Content-Type: application/json
Authorization: key=AIzaSyDK6sVMpKCbXp2LJbOQfBwulcsECai7K1I

```javascript
{
    "to": "d-mSRUL72ok:APA91bH8Ub5VuCKAz3jz6XXk2bGvD1X4vk82vADp45vY1k0Q76H_Sz3VTR7UAaJMWS1J_voUZG2WtnaUqfJzykP4BbTE722dgVM03ki59qgzSG2ylPMEdb0L36GF4Aj5W55NbzNhqIXK",
    "notification": {
        "title": "Pedido de Jorge",
        "body": "8 cajones de manzana",
        "actions": [
            {
                "title": "Aceptar",
                "icon": "ic_done_black_24dp",
                "callback": "acceptOrder"
            },
            {
                "title": "Cancelar",
                "icon": "ic_close_black_24dp",
                "callback": "cancelOrder"
            }
        ],
	    "data": {
            "amount": 8,
            "unit": "cajones",
            "product": "Manzana"
        }
    }
}
```

El "to" es el token del celular.
"title" es el titulo (¯\_(ツ)_/¯) y "body" es el mensaje.
El array de "actions" tiene que tener objetos como estan ahi, el title tiene que ser el texto a mostrar, el icono el nombre del recurso en android y el callback la funcion a ejecutar.
En data metemos los datos de negocio necesarios.

BUGS:
- Si la app esta en background, la notification bar no se cierra :/