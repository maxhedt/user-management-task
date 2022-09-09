import {Gender} from './gender';

export interface User {
  id?: number
  firstName: string
  lastName: string
  birthDate: Date
  email: string
  gender: Gender
  image: string
  phone?: string
  domain?: string
}
