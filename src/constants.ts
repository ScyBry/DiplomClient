export const API_ROUTES = {
  getAllDepartments: 'department/getAllDepartments',
  createDepartment: 'department/createDepartment',
  createGroup: 'group/createGroup',
  deleteGroup: 'group/deleteGroup',
  getOneGroup: 'group/findOneGroup',

  getAllTeachers: 'teacher/getAllTeachers',
  createTeacher: 'teacher/createTeacher',
  deleteTeacher: 'teacher/deleteTeacher',
  assignSubjectsToTeacher: 'teacher/assignSubjectsToTeacher',

  getAllGroupSubjects: 'subject/getAllGroupSubjects',
  createSubject: 'subject/createSubject',
  updateSubject: 'subject/updateSubject',
  deleteSubject: 'subject/deleteSubject',

  registerUser: 'auth/signup',
  loginUser: 'auth/signin',
  getProfile: 'auth/getProfile',

  getGroupSchedule: 'schedule/getGroupSchedule',
  saveDaySchedule: 'schedule/saveDaySchedule',
};

export const SUBJECT_TABLE_HEAD_ROWS = ['Дисциплина', 'Кол-во часов'];
export const TEACHER_TABLE_HEAD_ROWS = [
  'Имя',
  'Фамилия',
  'Отчество',
  'Кол-во часов',
];

export const TASKBAR_NAVIGATION = [
  {
    title: 'Преподаватели',
    route: '/teachers',
  },
  {
    title: 'Расписание',
    route: '/schedule',
  },
];

export const WEAK_DAYS = [
  {
    label: 'ПН',
    id: 'simple-tab-0',
  },
  {
    label: 'ВТ',
    id: 'simple-tab-1',
  },
  {
    label: 'СР',
    id: 'simple-tab-2',
  },
  {
    label: 'ЧТ',
    id: 'simple-tab-3',
  },
  {
    label: 'ПТ',
    id: 'simple-tab-4',
  },
];
