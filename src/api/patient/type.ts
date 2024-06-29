/**
 *       "createTime": "2024-06-25T18:10:09.000+00:00",
      "updateTime": "2024-06-25T18:22:14.600+00:00",
      "isDelete": 1,
      "id": 391691040,
      "uid": 230137888,
      "name": "叶耶耶",
      "gender": 0,
      "age": 22,
      "telephoneNumber": "18850719949",
      "relationship": "朋友"
 */

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

/**
 * {
  "uid": 230137888,
  "name": "叶耶耶",
  "gender": 0,
  "age": 22,
  "telephone": "18850719949",
  "relationship": "朋友"
}
 */
export interface AddPatientParams {
  uid: number
  name: string
  gender: number
  age: number
  telephone: string
  relationship: string
}

export interface AddPatientResponseData {
}

export interface DeletePatientParams {
  id: number
}