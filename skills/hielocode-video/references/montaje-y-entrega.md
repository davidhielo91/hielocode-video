# Montaje y entrega

## Primer corte

- Define una hoja de corte con el archivo fuente, entrada y salida del clip, posición en la secuencia y notas de audio o transición. Si se usan fotogramas, registra los FPS de la secuencia y conserva la fracción exacta, por ejemplo `30000/1001`.
- En material hablado, separa pausas prescindibles de pausas expresivas. Reproduce los empalmes que puedan cortar una palabra, respiración o ataque musical. Revisa el reencuadre en los planos que cambien a vertical.
- Al unir archivos con tamaños, FPS o códecs distintos, iguala el formato con un render de trabajo o monta en un editor que los ajuste a la secuencia. El modo de copia directa de FFmpeg conviene cuando los archivos tienen pistas compatibles y los cortes pueden coincidir con fotogramas clave.
- En clips con velocidad variable, usa los tiempos del medio y verifica los puntos de corte en el resultado. Si normalizas a una frecuencia fija, vuelve a medir sobre las copias normalizadas antes de generar los subtítulos o la línea de tiempo.

## Subtítulos y audio

- Genera el SRT a partir del audio del corte final cuando sea posible. Conserva nombres propios y pronunciaciones. Revisa que los segmentos tengan orden válido, que terminen dentro del video y que coincidan con las palabras.
- Entrega los subtítulos como SRT separado. Incrústalos cuando así lo pida el usuario o lo requiera la entrega. Comprueba que su posición no tape rostros ni texto esencial.
- Revisa los niveles de diálogo y música. Aplica los valores de loudness de la plataforma o cliente si fueron especificados.

## Exportación y revisión

- Para un MP4 general de revisión, H.264 con AAC y `yuv420p` cubre reproductores comunes. Mantén la resolución, relación de aspecto y FPS solicitados. Si el usuario pide transparencia, HDR u otro formato profesional, usa un perfil compatible con la aplicación de destino.
- Para una secuencia editable, consulta qué formato admite el editor de destino. Incluye las rutas o el manifiesto para reenlazar los medios y documenta efectos que salieron prerenderizados. Una hoja de corte puede servir de respaldo con tiempos y archivos fuente.
- Verifica resolución, duración, FPS y pistas con FFprobe. Inspecciona el primer y último fotograma y los empalmes importantes. Reproduce muestras de diálogo, comprueba los subtítulos y busca cuadros negros accidentales. Si se entrega XML u OTIO, importa el archivo cuando el editor esté disponible y compara la duración y los clips con el MP4.

Consulta las herramientas instaladas y la documentación del formato elegido. [FFmpeg](https://ffmpeg.org/documentation.html), [OpenTimelineIO](https://opentimelineio.readthedocs.io/), [exportación OTIO de Remotion](https://www.remotion.dev/docs/opentimeline/export)
