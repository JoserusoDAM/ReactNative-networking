import { API_SERVER_URI } from './../constants/constants'

export const createOpportunity = async (
    opportunity,
    okCallback = (json) => { },
    notOkCallback = (statusCode) => { },
    errorCallback = (error) => { }
  ) => {
    try {
      const response = await fetch(`${API_SERVER_URI}/oportunities/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(opportunity),
        credentials: "include",
      })
      // If its ok...
      if (response.ok) {
        okCallback();
        return ;
      }
      // If its not ok...
      notOkCallback(response.status);
    } catch (error) {
      // If an error occurs...
      errorCallback(error);
    }
  }