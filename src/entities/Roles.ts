export class Roles {
    private title:String
    private description:String
    private is_active:Boolean

    constructor (title:string ,description:String,is_active:Boolean){
        this.title = title;
        this.description = description;
        this.is_active = is_active;

    }
}