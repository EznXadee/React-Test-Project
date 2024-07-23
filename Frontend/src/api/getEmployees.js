const getEmployees = async () => {
    try {
        const r = await fetch("http://localhost:5000/get/employees", {
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

export default getEmployees;
