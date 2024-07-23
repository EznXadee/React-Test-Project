const getSales = async (start, end) => {
    let url = "http://localhost:5000/get/sales";

    if (start && end) {
        url += "?start=" + start + "&end=";
    } else if (start) {
        url += "?start=" + start;
    } else if (end) {
        url += "?end=" + end;
    } else {
        url += "?start=1398744000&end=9999999999";
    }
    console.log(url);
    try {
        const r = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await r.json();
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export default getSales;
