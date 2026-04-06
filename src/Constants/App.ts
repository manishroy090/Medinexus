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