import { useEffect, useState } from "react";

export const useFetchData = <T,>(input: RequestInfo | URL, init?: RequestInit) => {
    const [data, setData] = useState<Array<T>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const fetchData = async () => {
        const res = await fetch(input, init);
        setLoading(false);
        setError(!res.ok);
        setData((await res.json()).results);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { loading, data, error };
};
