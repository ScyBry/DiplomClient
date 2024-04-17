export interface IGroup {
  id: string;
  name: string;
  departmentId: string;
  subjectId?: string | null;
}

export interface IDepartment {
  id: string;
  name: string;
  groups: IGroup[];
}

export interface ITeacher {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  totalHours: number;
  subjectId: string;
}

export interface ISubject {
  id: string;
  name: string;
  hoursPerGroup: number;
  groupId: string;
  Teachers: ITeacher[];
}

export interface IRegisterUser {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

export interface ILoginUser {
  emailOrUsername: string;
  password: string;
}

export interface IGetProfile {
  id: string;
  email: string;
  username: string;
}
