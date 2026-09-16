const analyzeProduct = async (imagePath) => {

    return {
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
            value: null,
            confidence: 0.20
        }
    };
};

export default analyzeProduct;