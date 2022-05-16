import { Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, ValidateNested } from "class-validator"
import { CreateAddressDto } from "./Address.dto"

export class createCustomerDto {
    @IsEmail()
    email: string

    @IsNumberString()
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    name: string

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto
}