import { IsNotEmpty, IsString } from "class-validator";
import { Organization } from "../organization.model";

export class CreateOrganizationDto {
    @IsNotEmpty()
    @IsString()
    name: Organization['name'];
}