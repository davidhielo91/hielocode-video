---
name: hielocode-video
description: Planea y edita videos a partir de un guion, metraje existente o clips generados con IA. Úsala para storyboards, primeros cortes, subtítulos, motion graphics, Reels, Shorts, revisión de renders y entrega a un editor de video.
---

# HieloCode Video

Trabaja en el idioma del usuario. Usa su material, editor, formato y entregables como punto de partida. Si faltan detalles reversibles, indica los valores que asumirás y avanza. Pide una decisión cuando cambie el uso de los archivos, el costo o la aplicación de destino sea imprescindible para entregar.

## Elige el flujo según el material

| Entrada | Flujo |
| --- | --- |
| Clips ya grabados | Inspecciona los medios, identifica tomas y prepara el corte. Lee [montaje y entrega](references/montaje-y-entrega.md). |
| Guion, idea o referencia | Convierte el brief en una lista de planos. Si requiere material generado, aplica [preproducción y generación](references/preproduccion.md). |
| Material real y tomas faltantes | Arma el corte con el material disponible. Usa la lista de planos para acotar qué inserciones o tomas faltan y prepara su generación. |

## Del brief a la entrega

1. Identifica el objetivo, duración, relación de aspecto, idioma, material disponible y formato de entrega. Asigna identificadores estables a los planos para vincular el storyboard, las tomas y la línea de tiempo.
2. Para archivos locales, inspecciona las fuentes con `python scripts/inspeccionar_medios.py ARCHIVO [ARCHIVO ...]`, usando la ruta al script dentro de esta skill. El resultado JSON de FFprobe muestra duración, pistas, tamaño, orientación y FPS cuando esos datos existen. Los archivos con errores quedan identificados individualmente. Conserva la resolución y los FPS acordados al definir el montaje.
3. Escoge herramientas instaladas o integraciones ya configuradas. Usa FFmpeg para operaciones locales, el editor elegido para secuencias nativas y HyperFrames o Remotion si se necesitan gráficos animados y el entorno los ofrece. Para nube, confirma el proveedor y la autorización para subir metraje privado o gastar créditos cuando el usuario aún no los haya autorizado.
4. Conserva los archivos fuente. Guarda renders, subtítulos y datos del montaje como salidas nuevas. Cuando cortes o cambies la velocidad, fija los subtítulos al audio del corte final o actualiza su tiempo según el montaje.
5. Reproduce o inspecciona el resultado antes de entregarlo. Verifica que se abre, que cumple el formato pedido y que el audio y los subtítulos coinciden con el montaje. Entrega una línea de tiempo editable si el formato y las herramientas lo permiten. Indica en qué editor se verificó su importación o deja explícita la validación pendiente.

En tareas parciales, entrega el material solicitado en esa etapa. Cuando falte un motor, prepara los elementos que sí pueden completarse, como una lista de planos, una hoja de corte o un SRT a partir de tiempos confirmados.
