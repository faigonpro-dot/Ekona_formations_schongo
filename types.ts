
export interface EducationPath {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
  color?: string;
  subPaths?: EducationPath[];
}

export enum ViewState {
  MENU = 'MENU',
  SUB_MENU = 'SUB_MENU',
  CONTENT = 'CONTENT'
}
