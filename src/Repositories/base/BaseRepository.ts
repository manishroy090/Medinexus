import { IWrite } from "../interfaces/IWrite";
import { IRead } from "../interfaces/IRead";
import Database from "../../Services/Database.js";

export abstract class BaseRepository <T> implements IWrite<T> {

    public adminClient:any;

    constructor() {
        console.log('collection');
        console.log('collection');
        console.log('collection');
        console.log('collection');
        console.log('collection');
        console.log('collection',this.constructor.name);
        const datbase = new Database();
        this.adminClient =  datbase.getAdminClient();
    }

    // async init() {
      
    // }


    async create(item: T): Promise<any> {

        
        

    }


    // async update(): Promise<boolean> {
    //           return new Promise({'status':0});


    // }


    // async delete() {


    // }

    // async find() {


    // }


    // async findOne() {

    // }

}