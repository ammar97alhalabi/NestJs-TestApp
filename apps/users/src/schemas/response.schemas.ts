export class ResponseSchema{
    data:any
    status:number
    message?:string

    constructor(data:any,status:number,message?:string|''){
        this.data=data;
        this.status=status;
        this.message=message;
    }
}