import collatedTasks from '../helpers/index.js';

export const collatedTaskExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);
