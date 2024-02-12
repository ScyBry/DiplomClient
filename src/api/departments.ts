import { ROUTES } from '../constants';
import { axiosBase } from '../utils/axios/axiosBase';

export const getAllDepartments = async (withGroups: boolean) => {
  try {
    const response = await axiosBase.get(ROUTES.getAllDepartments, {
      params: {
        withGroups,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
