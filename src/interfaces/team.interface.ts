import { Role } from '../utils/role';
import { IListSpace } from './space.interface';

export interface IListTeam {
  id: number;
  name: string;
  role: Role;
  spaces: IListSpace[];
}
