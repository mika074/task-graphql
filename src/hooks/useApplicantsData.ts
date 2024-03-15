import { useQuery } from '@apollo/client';
import {
  GET_POSITIONS,
  GET_RELATIONS,
} from '../requests/query/applicants-query';

interface IApplicantsData {
  applicantIndividualCompanyRelations?: {
    data: {
      name: string;
      id: string;
    }[];
  };
  applicantIndividualCompanyPositions?: {
    data: {
      name: string;
      id: string;
    }[];
  };
}

export const useApplicantsData = () => {
  const { data: relations, loading: relationsLoading } =
    useQuery<IApplicantsData>(GET_RELATIONS);
  const { data: positions, loading: positionsLoading } =
    useQuery<IApplicantsData>(GET_POSITIONS);

  const uniqueItems = new Set();
  return {
    relations: {
      data: relations?.applicantIndividualCompanyRelations?.data?.filter(
        (i) => {
          if (!uniqueItems.has(i.name)) {
            uniqueItems.add(i.name);
            return true;
          }
          return false;
        }
      ),
    },
    positions: {
      data: positions?.applicantIndividualCompanyPositions?.data?.filter(
        (i) => {
          if (!uniqueItems.has(i.name)) {
            uniqueItems.add(i.name);
            return true;
          }
          return false;
        }
      ),
    },
    relationsLoading,
    positionsLoading,
  };
};
