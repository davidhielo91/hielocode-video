#!/usr/bin/env python3
"""Inspecciona archivos locales con FFprobe y devuelve un informe JSON."""

import argparse
import json
import shutil
import subprocess
from pathlib import Path


ENTRADAS = ':'.join((
    'format=format_name,start_time,duration,size',
    'stream=index,codec_type,codec_name,duration,width,height,sample_aspect_ratio,'
    'avg_frame_rate,r_frame_rate,pix_fmt,color_space,color_transfer,color_primaries,'
    'sample_rate,channels',
    'stream_disposition=attached_pic',
    'stream_side_data=rotation',
    'stream_tags=rotate,language',
))


def inspeccionar(ffprobe: str, archivo: Path) -> dict:
    if not archivo.is_file():
        return {'archivo': str(archivo), 'error': 'No se encontró un archivo regular.'}

    comando = [
        ffprobe, '-v', 'error', '-protocol_whitelist', 'file',
        '-show_entries', ENTRADAS, '-of', 'json', '-i', str(archivo.resolve()),
    ]
    try:
        proceso = subprocess.run(
            comando, capture_output=True, encoding='utf-8', errors='replace', timeout=30,
        )
        if proceso.returncode != 0:
            detalle = proceso.stderr.strip() or f'FFprobe terminó con código {proceso.returncode}.'
            return {'archivo': str(archivo), 'error': detalle}
        return {'archivo': str(archivo), 'datos': json.loads(proceso.stdout)}
    except subprocess.TimeoutExpired:
        return {'archivo': str(archivo), 'error': 'FFprobe superó el límite de 30 segundos.'}
    except (OSError, ValueError) as error:
        return {'archivo': str(archivo), 'error': str(error)}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archivos', nargs='+', type=Path, help='Rutas locales de video o audio.')
    args = parser.parse_args()

    ffprobe = shutil.which('ffprobe')
    if ffprobe is None:
        print(json.dumps({'error': 'FFprobe no está disponible en PATH.'}))
        return 2

    resultados = [inspeccionar(ffprobe, archivo) for archivo in args.archivos]
    print(json.dumps({'medios': resultados}, indent=2))
    return int(any('error' in resultado for resultado in resultados))


if __name__ == '__main__':
    raise SystemExit(main())
