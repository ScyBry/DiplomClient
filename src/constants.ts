export const API_ROUTES = {
  getAllDepartments: 'department/getAllDepartments',
  createDepartment: 'department/createDepartment',
  createGroup: 'group/createGroup',
  deleteGroup: 'group/deleteGroup',
  getOneGroup: 'group/findOneGroup',
  getAllTeachers: 'teacher/getAllTeachers',
  getAllGroupSubjects: 'subject/getAllGroupSubjects',
  updateSubject: 'subject/updateSubject',
  deleteSubject: 'subject/deleteSubject',
  registerUser: 'auth/signup',
  loginUser: 'auth/signin',
  getProfile: 'auth/getProfile',
};

export const TABLE_HEAD_ROWS = ['Дисциплина', 'Кол-во часов'];

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
