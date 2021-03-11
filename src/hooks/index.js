import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import moment from 'moment';
import { collatedTaskExist } from '../helpers/index';

export const useTasks = (selectedProject) => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'kcowKxBuVatU9ngSDRkB');

    // const temp = unsubscribe.where('projectId', '==', '1');
    //   .onSnapshot((snapshot) => snapshot.docs.data);
    // console.log(temp);

    // console.log( temp.onSnapshot( (snapshot) => {
    //   const newTasks = snapshot.docs.map((task) => ({
    //     id: task.id,
    //     ...task.data(),
    //   } ));

    unsubscribe =
      selectedProject && !collatedTaskExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD?MM?YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      // console.log(newTasks);

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'QAheGch')
      .orderBy('projectId')
      .get()
      .then(
        (snapshot) => {
          const allProjects = snapshot.docs.map((project) => ({
            ...project.data(),
            docId: project.id,
          }));

          if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
            setProjects(allProjects);
          }
        },
        [projects]
      );
  });
  return { projects, setProjects };
};
