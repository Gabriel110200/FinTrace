export interface ResponseAPI<T>{
  sucess:boolean
  data: T | T[]
}
