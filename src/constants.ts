export const API_ROUTES = {
  getAllDepartments: 'department/getAllDepartments',
  createDepartment: 'department/createDepartment',
  deleteDepartment: 'department/deleteDepartment',
  updateDepartment: 'department/updateDepartment',

  createGroup: 'group/createGroup',
  deleteGroup: 'group/deleteGroup',
  editGroup: 'group/updateGroup',
  getOneGroup: 'group/findOneGroup',

  getAllTeachers: 'teacher/getAllTeachers',
  updateTeacher: 'teacher/updateTeacher',
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
  'Фамилия',
  'Имя',
  'Отчество',
  'Кол-во часов',
];

export const TASKBAR_NAVIGATION = [
  {
    title: 'Главная',
    route: '/',
  },
  { title: 'Экспорт', route: '/exportSchedule' },
  {
    title: 'Преподаватели',
    route: '/teachers',
  },
];

export const WEEK_DAYS = [
  {
    value: 'ПН',
    label: 'Понедельник',
  },
  {
    value: 'ВТ',
    label: 'Вторник',
  },
  {
    value: 'СР',
    label: 'Среда',
  },
  {
    value: 'ЧТ',
    label: 'Четверг',
  },
  {
    value: 'ПТ',
    label: 'Пятница',
  },
];
