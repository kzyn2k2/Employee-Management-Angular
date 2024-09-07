export class Employee{

  syskey: string
  empId: string
  name: string
  dob: string
  nrc: string
  gender: string = 'Male'
  email: string
  mobile: string
  address: string
  fatherName: string
  drivingLicense?: string = ""
  city: City
  qualifications: Qualification[] = []
  image: string = ""

}

export class QualificationType {

  autokey: number
  name: string

}

export class Qualification {

  syskey: string
  qualType: number
  name: String
  year: number
  status: number = 1

}

export class City {

  autokey: number
  name: string

}
