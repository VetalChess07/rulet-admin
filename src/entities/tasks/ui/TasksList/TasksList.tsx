import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../../model/types/tasks';
import { renderTasksByStatus } from '../../model/lib/renderTasksByStatus';

import cls from './TasksList.module.scss';

export const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const initialTasks: Task[] = [
      {
        id: '1',
        status: TaskStatus.RECEIVED,
        title: 'Задача 21',
        task: 'Написать отчёт',
        description: 'Составить ежемесячный отчёт по проекту',
      },
      {
        id: '2',
        status: TaskStatus.NOTCOMPLETED,
        title: 'Задача 2',
        task: 'Созвон с командой',
        description: 'Обсудить прогресс и блокеры',
      },
      {
        id: '3',
        status: TaskStatus.RECEIVED,
        title: 'Задача sdfds fsf 3sd sdf ',
        task: 'Обновить документацию',
        description: 'Добавить описание новых API',
      },
      {
        id: '4',
        status: TaskStatus.NOTCOMPLETED,
        title: 'Задача sdfds fsf 3',
        task: 'Проверить pull requests',
        description: 'Сделать код-ревью последних PR',
      },
      {
        id: '5',
        status: TaskStatus.RECEIVED,
        title: 'Задача 5',
        task: 'Настроить CI/CD',
        description: 'Добавить авто-деплой в GitHub Actions',
      },
      {
        id: '6',
        status: TaskStatus.NOTCOMPLETED,
        title: 'Задача 6',
        task: 'Написать тесты',
        description: 'Покрыть модуль авторизации unit-тестами',
      },
      {
        id: '7',
        status: TaskStatus.RECEIVED,
        title: 'Задача 7',
        task: 'Подготовить презентацию',
        description: 'Для встречи с заказчиком в пятницу',
      },
      {
        id: '8',
        status: TaskStatus.NOTCOMPLETED,
        title: 'Задача 8',
        task: 'Проверка безопасности',
        description: 'Провести аудит уязвимостей в проекте',
      },
      {
        id: '9',
        status: TaskStatus.RECEIVED,
        title: 'Задача 9',
        task: 'Провести интервью',
        description: 'Собеседование с кандидатом на frontend-разработчика',
      },
    ];

    setTasks(initialTasks);
  }, []);

  return (
    <div className={cls.TasksList}>
      {tasks?.map((task) => renderTasksByStatus({ task, setTasks }))}
    </div>
  );
};
