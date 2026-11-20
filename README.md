![Símbolo de reproducción grabado en hielo sobre una línea de tiempo](docs/portada.png)

# HieloCode Video

Una skill en español para planear, montar y revisar videos con **Codex, Claude Code y OpenCode**. Trabaja con el metraje que ya tienes, prepara las tomas que faltan y organiza la entrega para que puedas seguir editando.

[Instalación](#instalación) · [Primer proyecto](#primer-proyecto) · [Requisitos](#requisitos) · [Créditos](#créditos-y-licencia)

## Instalación

Abre la terminal en la carpeta de tu proyecto de video. El instalador crea las carpetas de la skill dentro de la ruta desde la que lo ejecutas. Requiere Node.js 22.20 o posterior. [Opciones del instalador](https://github.com/vercel-labs/skills/blob/main/docs/commands.md#skills-add)

### Windows con PowerShell

Cambia `C:\ruta\a\tu\proyecto` por la carpeta donde editas tus videos. Comprueba que `Get-Location` muestra esa carpeta antes de instalar. Si ves `C:\Windows\System32` o el instalador devuelve `EPERM` intentando escribir ahí, cambia de carpeta. Una carpeta de proyecto donde tienes permiso de escritura funciona sin abrir PowerShell como administrador.

```powershell
Set-Location -LiteralPath 'C:\ruta\a\tu\proyecto'
Get-Location
```

```powershell
npx.cmd --yes skills add davidhielo91/hielocode-video@v0.1.0 --skill hielocode-video -a codex -a claude-code -a opencode --copy -y
```

### macOS y Linux

Desde la carpeta de tu proyecto, ejecuta:

```sh
npx --yes skills add davidhielo91/hielocode-video@v0.1.0 --skill hielocode-video -a codex -a claude-code -a opencode --copy -y
```

Al terminar, encontrarás `hielocode-video/SKILL.md` dentro de `.agents/skills` para Codex y OpenCode y de `.claude/skills` para Claude Code.

<details>
<summary>Instalación desde el ZIP sin descargar el CLI</summary>

Descarga y descomprime el paquete de la versión. Desde tu proyecto de video, ejecuta el instalador incluido con Node.js. Ajusta la ruta a la ubicación de la carpeta descomprimida. También puedes usar `--project` con la ruta de tu proyecto para indicar el destino desde cualquier carpeta. Agrega `--dry-run` para ver los destinos antes de copiar. [Descargas de HieloCode Video](https://github.com/davidhielo91/hielocode-video/releases)

```sh
node "../hielocode-video/instalar-video-skills.mjs" --source "../hielocode-video/skills"
```

</details>

## Primer proyecto

Abre el proyecto con tu agente y prueba con un pedido concreto:

> Usa `hielocode-video` para montar estas tres tomas en un Reel de 30 segundos. Conserva los originales. Entrégame un MP4 de revisión, subtítulos SRT y una hoja de cortes con los tiempos de cada clip.

| Si partes de… | Puedes pedir… |
| --- | --- |
| Un guion o una idea | Storyboard y fichas de plano con cámara, duración y referencias de continuidad. |
| Material grabado | Primer corte, subtítulos y verificación del MP4 con las herramientas disponibles. |
| Metraje y tomas faltantes | Un plan para generar los planos de apoyo e incorporarlos al montaje. |

Si necesitas una **línea de tiempo editable**, indica tu editor y su versión. La exportación depende del adaptador disponible. La hoja de cortes conserva los tiempos y archivos fuente para reconstruir el montaje.

## Requisitos

| Trabajo | Herramientas |
| --- | --- |
| Guion, storyboard y hoja de cortes | Un agente con acceso a los archivos del proyecto. |
| Inspección de medios | Python 3.10 o posterior y FFprobe. |
| Edición y render local | FFmpeg. Para transcribir, un motor local o un servicio autorizado. |
| Generación y edición en apps | La integración del editor o del proveedor elegido. Los servicios de nube usan tu cuenta y tus créditos. |

En Windows se probó la instalación y un montaje de dos clips con MP4 de revisión y hoja de cortes. La validación de servicios en nube e importaciones nativas depende de cada integración.

## Créditos y licencia

El contenido original de HieloCode Video se comparte bajo licencia MIT. FFmpeg, HyperFrames, Remotion, ComfyUI y los demás proyectos se enlazan a sus fuentes y tienen sus propias licencias o términos. [Licencia MIT](LICENSE) · [Créditos y herramientas externas](skills/hielocode-video/references/creditos.md)
