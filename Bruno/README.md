# Colección Bruno - API de Notas

Importa esta carpeta completa desde Bruno:

```text
C:\Users\Camila\Documents\GitHub\EVA2_DESAWEB_II\Bruno
```

Selecciona el environment `Local`.

## Orden recomendado

1. `Root / Health`
2. `Categories / Create Category`
3. `Tags / Create Tag`
4. Ajusta las variables `categoryId` y `tagId` si la BD no devolvio `1`.
5. `Notes / Create Note`
6. Ajusta la variable `noteId` si la BD no devolvio `1`.
7. `Note Tags / Add Tag To Note`
8. Usa los requests `List`, `Get`, `Update` y `Delete` segun lo que quieras probar.

## Variables

```text
baseUrl=http://localhost:3000
baseURL=http://localhost:3000
basedURL=http://localhost:3000
categoryId=1
tagId=1
noteId=1
```

Si borras registros o tu base ya tenia datos, actualiza los IDs desde el panel de variables de Bruno.
