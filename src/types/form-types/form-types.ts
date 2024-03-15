import {
  ApplicantIndividualCompanyPosition,
  ApplicantIndividualCompanyRelation,
} from '../../../types';

export type InputTypes =
  | ApplicantIndividualCompanyRelation[]
  | ApplicantIndividualCompanyPosition;

export interface Fields {
  relations: InputTypes;
  positions: InputTypes;
  name: string;
  description: string;
}
