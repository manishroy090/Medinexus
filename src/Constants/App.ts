import { env } from "node:process"


export const table_prefix = "health_care_manish_ray"
export const HOSHPITAL = 'HOSHPITAL';
export const JWT_SECRET = 'supersecret'

export const Config = {
    'hoshpital':'Hoshpital',
    'BloodBank':'BloodBank',
    'AdminDBName':process.env.AdminDBName,
    'ClientDBName':env.ClientDBName
}



export const HoshpitalRole =[
    {name:"Doctors"},
    {name:"Physicians"},
    {name:"Nurses"},
    {name:"Surgeons"},
    {name:"Anesthesiologists"},
    {name:"Pharmacists"},
    {name:"LabTechnicians"},
    {name:"Radiologists"},
    {name:"Radiologic_Technologists"},
    {name:"Sonographers"},
    {name:"Physiotherapists"},
    {name:"Occupational_Therapists"},
    {name:"Hospital_Administrators"},
    {name:"Receptionists"},
    {name:"Medical_Records_Staff"},
    {name:"Billing_Insurance_Staff"}
]