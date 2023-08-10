import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useGetActivity() {
  const token = useToken();

  const {
    data: activity,
    loading: getActivityLoading,
    error: getActivityError,
    act: getActivity,
  } = useAsync((data) => activityApi.getActivityDays(token));

  return {
    activity,
    getActivityLoading,
    getActivityError,
    getActivity,
  };
}
