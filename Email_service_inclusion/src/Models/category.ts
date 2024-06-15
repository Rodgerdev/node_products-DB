import { Request } from "express"

export interface CategoryRequest extends Request{
body:{
    Name:string
}
}

export interface Category {
    Id:string
    Name:string
}