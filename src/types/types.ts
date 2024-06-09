export interface IGroup {
  id: string;
  name: string;
  departmentId: string;
  subjects: ISubject[];
}

export interface IDepartment {
  id: string;
  name: string;
  location: string;
  groups: IGroup[];
}

export interface ITeacher {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  fullName: string;
  totalHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterUser {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  token: string;
}

export interface ILoginUser {
  emailOrUsername: string;
  password: string;
  token: string;
}

export interface IGetProfile {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

export interface ISubject {
  id?: string;
  name: string;
  hoursPerGroup: number;
  createdAt?: Date;
  updatedAt?: Date;
  groupId?: string;
  teachers?: ITeacher[];
  Group?: IGroup;
}

export interface IScheduleSubject {
  orderNumber: number;
  subjectId: string;
  roomNumber: string;
}

export interface IScheduleDay {
  groupId: string;
  dayScheduleId: string;
  daySubjects: IScheduleSubject[];
}

export interface IScheduleData {
  id: string;
  dayOfWeek: string;
  groupId: string;
  lastConfirm: Date;
  Group: IGroup;
  scheduleSubjects: ScheduleSubject[];
}

export interface ScheduleSubject {
  id: string;
  ScheduleSubjectCabinet: IScheduleSubjectCabinet[];
  orderNumber: number;
  subjectId: string;
  dayScheduleId: string;
}

export interface IScheduleSubjectCabinet {
  cabinetId: string;
  subjectId: string;
  cabinet: ICabinet;
}

export interface ICabinet {
  id: string;
  roomNumber: string;
  location: 'УПК' | 'ГЛВ';
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
