# Preproducción y generación de tomas

## Ficha de plano

Usa una fila por toma planeada. Mantén el mismo identificador durante las revisiones y asigna versiones a los archivos generados.

| Campo | Contenido |
| --- | --- |
| Plano | Identificador estable, como `P03` |
| Edición | Posición en el montaje, duración útil y margen para cortar |
| Imagen | Sujeto, acción, entorno, cámara, luz y relación de aspecto |
| Continuidad | Referencias autorizadas, vestuario, posición, dirección de movimiento y estado de objetos |
| Audio | Diálogo, ambiente, efecto o tiempo exacto donde debe entrar |
| Fuente | Archivo y tramo de origen, o proveedor, modelo y referencias de generación |
| Toma elegida | Versión aprobada y observaciones para el montaje |

Para metraje existente, marca el archivo de origen y qué acción conviene cortar. Para tomas nuevas, redacta una instrucción visual por plano. Define una sola acción principal y qué debe verse al comienzo y al final. Proporciona fotogramas de referencia cuando el modelo elegido los admita.

## Ejecutar la generación

- Comprueba qué modelos y parámetros están disponibles en el proveedor conectado. La duración, resolución, fotogramas de entrada y audio dependen del modelo.
- Para una escena con continuidad, valida un fotograma o una toma corta antes de repetir la generación en el resto de los planos. Conserva las referencias de la versión que se apruebe.
- Revisa cada toma para detectar anomalías que afecten el montaje, como deformaciones, objetos que cambian, texto ilegible, cambios bruscos de exposición o desajustes labiales. Registra los intervalos aprovechables.
- Con ComfyUI local, usa un flujo que exista en la instalación y sus modelos. Para una API, consulta el precio, la disponibilidad y los formatos admitidos antes de enviar el trabajo. Si falta acceso, entrega las fichas y las instrucciones por plano para ejecutar luego.

Consulta las páginas de los proveedores que el usuario haya elegido. [ComfyUI](https://docs.comfy.org/), [fal.ai](https://fal.ai/models), [HeyGen](https://docs.heygen.com/)
