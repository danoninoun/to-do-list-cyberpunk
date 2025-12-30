/** @jest-environment jsdom */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('script.js - addTask y toggleTask', () => {
  let sandbox;
  let scriptContent;
  const scriptPath = path.resolve(__dirname, '../script.js');

  beforeAll(() => {
    scriptContent = fs.readFileSync(scriptPath, 'utf8');
  });

  beforeEach(() => {
    // preparar DOM requerido por script.js
    document.body.innerHTML = `
      <input id="taskInput" />
      <button id="addBtn">Add</button>
      <ul id="taskList"></ul>
    `;

    // limpiar localStorage
    window.localStorage.clear();

    // crear sandbox que tenga acceso a document, window y localStorage
    // también pasamos console para que cualquier log del script no falle
    sandbox = {
      window,
      document,
      localStorage: window.localStorage,
      console,
      // funciones de temporizador si el script las necesitara
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval
    };

    // Ejecutar el script dentro del sandbox para exponer sus funciones/variables en sandbox
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
  });

  test('addTask añade una tarea no vacía y la guarda en tasks y localStorage', () => {
    // preparar input
    const input = document.getElementById('taskInput');
    input.value = 'Tarea de prueba';

    // llamar a addTask desde el sandbox
    expect(typeof sandbox.addTask).toBe('function');
    sandbox.addTask();

    // comprobar estado interno tasks
    expect(Array.isArray(sandbox.tasks)).toBe(true);
    expect(sandbox.tasks).toHaveLength(1);
    expect(sandbox.tasks[0].text).toBe('Tarea de prueba');
    expect(sandbox.tasks[0].completed).toBe(false);

    // comprobar que se haya guardado en localStorage
    const stored = JSON.parse(window.localStorage.getItem('cyberpunkTasks'));
    expect(Array.isArray(stored)).toBe(true);
    expect(stored).toHaveLength(1);
    expect(stored[0].text).toBe('Tarea de prueba');
  });

  test('addTask no añade tareas vacías (cadena vacía o solo espacios)', () => {
    const input = document.getElementById('taskInput');

    // caso: cadena vacía
    input.value = '';
    sandbox.addTask();
    expect(sandbox.tasks).toHaveLength(0);
    expect(window.localStorage.getItem('cyberpunkTasks')).toBeNull();

    // caso: solo espacios
    input.value = '   ';
    sandbox.addTask();
    expect(sandbox.tasks).toHaveLength(0);
    expect(window.localStorage.getItem('cyberpunkTasks')).toBeNull();
  });

  test('toggleTask invierte el estado completed de una tarea existente', () => {
    // añadir una tarea primero
    const input = document.getElementById('taskInput');
    input.value = 'Tarea para togglear';
    sandbox.addTask();

    expect(sandbox.tasks).toHaveLength(1);
    const taskId = sandbox.tasks[0].id;
    expect(sandbox.tasks[0].completed).toBe(false);

    // toggle -> debe quedar true
    sandbox.toggleTask(taskId);
    expect(sandbox.tasks[0].completed).toBe(true);

    // toggle otra vez -> debe volver a false
    sandbox.toggleTask(taskId);
    expect(sandbox.tasks[0].completed).toBe(false);

    // comprobar que localStorage se actualizó
    const stored = JSON.parse(window.localStorage.getItem('cyberpunkTasks'));
    expect(stored[0].completed).toBe(false);
  });
});
