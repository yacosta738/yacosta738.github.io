---
title: Agregar selector de imagen en flutter
date: 2020-12-18
description: El selector de imágenes es un componente común que a menudo necesitamos para los perfiles de usuario y otras cosas. Cómo agregar un selector de imágenes para aletear para seleccionar imágenes de la galería o la cámara.
author: Yuniel Acosta
lang: es
tags: [Flutter, Dart]
categories: [Software Development]
cover: /uploads/portada-add-images-selector-flutter.webp
draft: false
---

![background](/uploads/portada-add-images-selector-flutter.webp)

El selector de imágenes es un componente común que a menudo se necesita para cambiar las fotos de los perfiles de usuario entre muchas otras opciones donde es necesario subir una imagen. Con el fin de proveer a nuestra aplicación de la opción de subir imágenes seleccionadas desde nuestro dispositivo, ya sea en la cámara o la galería, usaremos el [complemento](https://pub.dev/packages/image_picker) hecho por desarrolladores de Flutter.

## **Paso 1**: Agregar la dependencia a su archivo **_pubspec.yaml_**.

    image_picker: ^0.6.7+14

## **Paso 2**: Configurar las plataformas nativas

A continuación, necesitamos configurar los ajustes nativos. Para la plataforma Android, no se necesita configurar nada. Para iOS, abra el archivo `Info.plist` que se encuentra en la carpeta `ios/Runner` y agregue las siguientes claves.

```text
<key>NSPhotoLibraryUsageDescription</key>
<string>Allow access to photo library</string>

<key>NSCameraUsageDescription</key>
<string>Allow access to camera to capture photos</string>

<key>NSMicrophoneUsageDescription</key>
<string>Allow access to microphone</string>
```

## **Paso 3**: Función de selector de imágenes

En la clase `State` de `StatefulWidget` de nuestra pantalla, declare una variable de tipo `File` para contener la imagen
elegida por el usuario.

    File _image;

Ahora escriba dos funciones para seleccionar imágenes a través de la cámara y la galería de fotos, respectivamente. El parámetro opcional `imageQuality` acepta cualquier valor entre 0 y 100, este parámetro se puede ajustar según el tamaño y la calidad que requiera la aplicación. Después de obtener el archivo de imagen, lo guardamos en la variable `_image` y llamamos a `setState ()` para que se pueda mostrar en la pantalla.

```dart
    _imgFromCamera() async {
    File image = await ImagePicker.pickImage(
        source: ImageSource.camera, imageQuality: 50
    );

    setState(() {
      _image = image;
    });
  }

  _imgFromGallery() async {
    File image = await ImagePicker.pickImage(
        source: ImageSource.gallery, imageQuality: 50
    );

    setState(() {
      _image = image;
    });
  }
```

## **Paso 4**: Crear un selector de opciones para seleccionar la cámara o la galería

A continuación, se observa la función para mostrar un `bottom sheet` para que el usuario elija la opción de cámara o galería.

```dart
void _showPicker(context) {
  showModalBottomSheet(
      context: context,
      builder: (BuildContext bc) {
        return SafeArea(
          child: Container(
            child: new Wrap(
              children: <Widget>[
                new ListTile(
                    leading: new Icon(Icons.photo_library),
                    title: new Text('Photo Library'),
                    onTap: () {
                      _imgFromGallery();
                      Navigator.of(context).pop();
                    }),
                new ListTile(
                  leading: new Icon(Icons.photo_camera),
                  title: new Text('Camera'),
                  onTap: () {
                    _imgFromCamera();
                    Navigator.of(context).pop();
                  },
                ),
              ],
            ),
          ),
        );
      }
  );
}
```

## **Paso 5**: Crear y configurar la vista de imagen en pantalla

Finalmente, creemos un soporte de imagen de perfil en la pantalla, que abre el selector al hacer clic y muestra la imagen seleccionada.

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(),
    body: Column(
      children: <Widget>[
        SizedBox(
          height: 32,
        ),
        Center(
          child: GestureDetector(
            onTap: () {
              _showPicker(context);
            },
            child: CircleAvatar(
              radius: 55,
              backgroundColor: Color(0xffFDCF09),
              child: _image != null
                  ? ClipRRect(
                borderRadius: BorderRadius.circular(50),
                child: Image.file(
                  _image,
                  width: 100,
                  height: 100,
                  fit: BoxFit.fitHeight,
                ),
              )
                  : Container(
                decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(50)),
                width: 100,
                height: 100,
                child: Icon(
                  Icons.camera_alt,
                  color: Colors.grey[800],
                ),
              ),
            ),
          ),
        )
      ],
    ),
  );
}

```

Listo, ejecute la aplicación y debería ver algo como esto.

![Result](/uploads/resultado.gif)
