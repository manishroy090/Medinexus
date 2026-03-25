import { IWrite } from "../interfaces/IWrite";
import { IRead } from "../interfaces/IRead";
import Database from "../../Services/Database";

export abstract class BaseRepository {

    public adminClient:any;




    constructor() {



    }

    async init() {
        const datbase = new Database();
        this.adminClient = await datbase.getAdminClient();
    }


    async create() {

    }


    async update() {

    }


    async delete() {


    }

    async find() {


    }


    async findOne() {

    }

}