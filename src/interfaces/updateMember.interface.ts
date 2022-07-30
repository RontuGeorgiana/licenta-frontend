import { Role } from '../utils/role';

export interface IUpdateMember {
  teamId: number;
  userId: number;
  role: Role;
}
