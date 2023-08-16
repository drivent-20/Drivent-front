import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useGetActivitiesDay() {
  const token = useToken();

  const {
    data: activityDay,
    loading: getActivityDayLoading,
    error: getActivityDayError,
    act: getActivityDay,
  } = useAsync((dateFilter) => activityApi.getActivitiesOfTheDay(dateFilter, token));

  return {
    activityDay,
    getActivityDayLoading,
    getActivityDayError,
    getActivityDay,
  };
}
