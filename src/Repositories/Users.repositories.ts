// import { Roles } from "../entities/Roles";

import { User } from "../db/models/User.js";
import { pool } from "../db/models/Model.js";

export class UsersRepositories {


    public user: any;


    constructor() {
        this.user = new User();
    }



    async getAllusers() {
        return this.user.all();
    }


    async createUser(user: any) {
        const result = await this.user.create(user);
        return result;
    }

    async getUserByEmail(email: any) {
        const resutl = await this.user.findUserByEmail(email);
        return resutl[0];
    }


    async getUserByName(name: String) {
        const result = await this.user.where('name', name);
        return result;
    }


    async getOrgDbDetails(email: String) {

       const query =  `SELECT
        public.medinexus_users.name AS user_name,
        public.medinexus_countries.title AS country_name
        FROM public.medinexus_users
        LEFT JOIN public.medinexus_organizations
        ON public.medinexus_users.id = public.medinexus_organizations.user_id
        LEFT JOIN public.medinexus_countries
        ON public.medinexus_countries.id = public.medinexus_organizations.country_id
        WHERE public.medinexus_users.email = $1`


       const {rows} = await pool.query(query,[email]);

       return rows[0];

    }


}