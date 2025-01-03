import { Usuario } from 'src/app/shared/model/usuario';

export interface FeatureFlag{
  id: 1,
  name: string,
  user: Usuario,
  type: number,
  active: boolean
}

