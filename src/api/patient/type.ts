import type { ResponseData } from '../type'
export interface Patient {
  id: number
  uid: number
  name: string
  gender: number
  age: number
  telephoneNumber: string
  relationship: string
}

export interface PatientResponseData {
  data: Patient
}

export interface AddPatientParams {
  uid: number
  name: string
  gender: number
  age: number
  telephone: string
  relationship: string
}

export interface AddPatientResponseData extends ResponseData {
  data: { id: number }
}

export interface DeletePatientParams {
  id: number
}
