import React, { useLayoutEffect, useState } from "react";
import axiosInstance from "../utils/axiosHelper";
import LoadingComponent from "../components/LoadingComponent";
import useQuoteStore from "../store/useQuoteStore";

const QuotesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { setQuotes } = useQuoteStore();

  useLayoutEffect(() => {
    const fetchQuotes = async () => {
      try {
        // const response = await axiosInstance.get("quotes");
        // if (response.status === 200) {
        //   setQuotes(response.data.quotes);
        // }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      {/* Pass down the auth state and actions as props */}
      {isLoading ? <LoadingComponent /> : children}
    </div>
  );
};

export default QuotesProvider;
