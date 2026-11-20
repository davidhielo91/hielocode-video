import {
  accessSync, constants, cpSync, lstatSync, mkdirSync, mkdtempSync,
  readdirSync, realpathSync, renameSync, rmSync, statSync,
} from 'node:fs';
import { delimiter, dirname, join, resolve } from 'node:path';
import { parseArgs } from 'node:util';

const agentDirectories = {
  codex: '.agents',
  opencode: '.agents',
  claude: '.claude',
};

function statIfPresent(path) {
  try {
    return lstatSync(path);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return undefined;
  }
}

function isExecutableOnPath(command) {
  const suffixes = process.platform === 'win32' ? ['.exe', '.cmd', '.bat', '.ps1'] : [''];
  return (process.env.PATH ?? '').split(delimiter).filter(Boolean).some((directory) =>
    suffixes.some((suffix) => {
      try {
        const path = join(directory.replace(/^"|"$/g, ''), command + suffix);
        accessSync(path, constants.X_OK);
        return statSync(path).isFile();
      } catch {
        return false;
      }
    }),
  );
}

function selectAgents(selection) {
  const supported = Object.keys(agentDirectories);
  if (selection === 'all') return supported;

  if (selection === 'auto') {
    const detected = supported.filter(isExecutableOnPath);
    console.log(`Detectados en PATH ${detected.join(', ') || 'ninguno. Se usarán los tres destinos'}.`);
    return detected.length > 0 ? detected : supported;
  }

  const agents = selection.split(',').map((name) => name.trim() === 'claude-code' ? 'claude' : name.trim());
  if (agents.some((agent) => !supported.includes(agent))) {
    throw new Error('Usa --agents all, --agents auto o una lista de codex, claude y opencode.');
  }
  return [...new Set(agents)];
}

function destinationRoot(project, agentDirectory, dryRun) {
  const config = join(project, agentDirectory);
  const root = join(config, 'skills');
  for (const path of [config, root]) {
    const entry = statIfPresent(path);
    if (entry && !entry.isDirectory()) {
      throw new Error(`El destino debe ser una carpeta directa del proyecto: ${path}`);
    }
    if (!entry && !dryRun) mkdirSync(path, { recursive: true });
  }
  return root;
}

function copySkill(source, root, destination) {
  const stage = mkdtempSync(join(root, '.video-skills-'));
  const stageSkill = join(stage, 'skill');
  try {
    cpSync(source, stageSkill, {
      recursive: true,
      filter(path) {
        const entry = lstatSync(path);
        if (!entry.isDirectory() && !entry.isFile()) {
          throw new Error(`La skill contiene un enlace u otro archivo no portable: ${path}`);
        }
        return true;
      },
    });
    if (statIfPresent(destination)) return false;
    renameSync(stageSkill, destination);
    return true;
  } finally {
    if (dirname(realpathSync(stage)) === root) rmSync(stage, { recursive: true, force: true });
  }
}

function run() {
  const { values } = parseArgs({
    options: {
      source: { type: 'string' },
      project: { type: 'string', default: '.' },
      agents: { type: 'string', default: 'all' },
      'dry-run': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help || !values.source) {
    console.log('node instalar-video-skills.mjs --source RUTA_A_SKILLS [--project RUTA_PROYECTO] [--agents all|auto|codex,claude,opencode] [--dry-run]');
    console.log('La carpeta fuente debe contener una subcarpeta por skill, cada una con su archivo SKILL.md.');
    if (!values.help) process.exitCode = 1;
    return;
  }

  const source = realpathSync(resolve(values.source));
  const project = realpathSync(resolve(values.project));
  if (!statSync(project).isDirectory()) throw new Error('La ruta del proyecto debe ser una carpeta.');

  const skills = readdirSync(source, { withFileTypes: true }).filter((entry) =>
    entry.isDirectory() && statIfPresent(join(source, entry.name, 'SKILL.md'))?.isFile(),
  );
  if (skills.length === 0) throw new Error(`La carpeta ${source} no contiene skills con SKILL.md.`);
  const invalid = skills.find(({ name }) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64);
  if (invalid) throw new Error(`Nombre de skill no portable: ${invalid.name}`);

  const agents = selectAgents(values.agents);
  const directories = [...new Set(agents.map((agent) => agentDirectories[agent]))];
  directories.forEach((directory) => destinationRoot(project, directory, true));
  console.log(`Proyecto ${project}`);
  console.log(`Agentes ${agents.join(', ')}`);

  for (const directory of directories) {
    const root = destinationRoot(project, directory, values['dry-run']);
    for (const { name } of skills) {
      const destination = join(root, name);
      const label = `${directory}/skills/${name}`;
      if (statIfPresent(destination)) {
        console.log(`Ya existe ${label}`);
      } else if (values['dry-run']) {
        console.log(`Se copiaría ${label}`);
      } else {
        const copied = copySkill(join(source, name), root, destination);
        console.log(`${copied ? 'Instalada' : 'Ya existe'} ${label}`);
      }
    }
  }
}

try {
  run();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
