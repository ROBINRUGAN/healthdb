import type { ResponseData } from "../type"

export interface Patient {
  id: number
  uid: number
  name: string
  gender: number
  age: number
  telephoneNumber: string
  relationship: string
}

export interface PatientListResponseData {
  data: Patient[]
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

export interface AddPatientResponseData extends ResponseData{
}

export interface DeletePatientParams {
  id: number
}