import { API_SERVER_URI } from './../constants/constants';

export const getOpportunitiesReceived = async (
    okCallback = () => {},
    notOkCallback = (statusCode) => {},
    errorCallback = (error) => {}
  ) => {
    try {
      const response = await fetch(`${API_SERVER_URI}/oportunities/received`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: 'application/json',
         },
      });
      // If its ok...
      if (response.ok) {
        okCallback(await response.json());
        return;
      }
      // If its not ok...
      notOkCallback(response.status);
    } catch (error) {
      // If an error occuurs...
      errorCallback(error);
    }
  };
  
  export const getOpportunitiesOffered = async (
    okCallback = () => {},
    notOkCallback = (statusCode) => {},
    errorCallback = (error) => {}
  ) => {
    try {
      const response = await fetch(`${API_SERVER_URI}/oportunities/offered`, {
        method: "GET",
        credentials: "include",
      });
      // If its ok...
      if (response.ok) {
        okCallback(await response.json());
        return;
      }
      // If its not ok...
      notOkCallback(response.status);
    } catch (error) {
      // If an error occuurs...
      errorCallback(error);
    }
  };
  
  export const responseToOpportunity = async (
    id,
    accepted,
    title,
    idCompanyOffered,
    idCompanyReceived,
    okCallback = () => {},
    notOkCallback = (statusCode) => {},
    errorCallback = (error) => {}
  ) => {
    try {
      const response = await fetch(`${API_SERVER_URI}/oportunities/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          accepted,
          title,
          idCompanyOffered,
          idCompanyReceived,
        }),
        credentials: "include",
      });
      // If its ok...
      if (response.ok) {
        okCallback();
        return;
      }
      // If its not ok...
      notOkCallback(response.status);
    } catch (error) {
      // If an error occuurs...
      errorCallback(error);
    }
  };