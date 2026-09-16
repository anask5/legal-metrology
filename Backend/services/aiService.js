const analyzeProduct = async (imagePath) => {

    console.log("Mock AI received:", imagePath);


    const isViolation = Math.random() < 0.5;

    const violationFields = [
        "product_name",
        "manufacturer",
        "country_of_origin",
        "net_quantity",
        "mrp",
        "manufacturing_date",
        "best_before",
        "consumer_care"
    ];


    const missingField = isViolation
        ? violationFields[Math.floor(Math.random() * violationFields.length)]
        : null;

    console.log(
        isViolation
            ? `Mock violation: ${missingField}`
            : "Mock result: COMPLIANT"
    );

    const data = {

        product_name: {
            value: "ABC Shampoo",
            confidence: 0.96
        },

        manufacturer: {
            value: "ABC Pvt Ltd",
            confidence: 0.91
        },

        country_of_origin: {
            value: "India",
            confidence: 0.98
        },

        net_quantity: {
            value: "500 ml",
            confidence: 0.94
        },

        mrp: {
            value: "₹299",
            confidence: 0.97
        },

        manufacturing_date: {
            value: "06/2026",
            confidence: 0.89
        },

        best_before: {
            value: "24 months",
            confidence: 0.82
        },

        consumer_care: {
            value: "1800-123-4567",
            confidence: 0.94
        }

    };


    if (missingField) {

        data[missingField].value = null;
        data[missingField].confidence = 0.20;

    }

    return data;
};

export default analyzeProduct;