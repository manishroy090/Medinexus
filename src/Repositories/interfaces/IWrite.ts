export interface IWrite<T>{
    create(item: T) :any // Promise<boolean>;
    // update(id: string , item: T) : Promise<boolean>
    // delete(id:string) : Promise<boolean>
}