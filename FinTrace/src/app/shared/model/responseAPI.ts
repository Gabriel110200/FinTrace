export interface ResponseAPI<T>{
  sucess:boolean
  data: T
}

export interface ResponseAPIList<T>{
  sucess:boolean
  data: T[]
}