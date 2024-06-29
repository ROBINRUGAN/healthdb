
export interface Escort {
  id: number
  uid: number
  avatar: string
  isMedicalWorker: number
  workSection: string
  age: number
  gender: number
  telephone: string
  areaCode: string
  name: string
  identity: string
  isPassed: number

}

export interface EscortResponseData {
  data: Escort
}

export interface AddEscortParams {
  uid: number
  avatar: string
  isMedicalWorker: number
  workSection: string
  age: number
  gender: number
  telephone: string
  city: string
  name?: string
  identity?: string
}

