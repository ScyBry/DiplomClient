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
