import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import moment from 'moment';
import collatedTaskExist from '../helpers/index';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'kcowKxBuVatU9ngSDRkB');

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
  }, [selectedProject]);
};
