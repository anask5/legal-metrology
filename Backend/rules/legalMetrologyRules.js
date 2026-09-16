// LOGIC FOR RULE ENGINE 

// NAME THIS FUNCTION CHECK COMPLIANCE AND EXPORT IT THEN INTEGRATE IT WITH THE SCAN API IN App.JS

const checkCompliance = async (data) => {

    const results = [];
    const violations = [];

    // Mandatory fields
    const requiredFields = [
        {
            key: "product_name",
            name: "Product Name"
        },
        {
            key: "manufacturer",
            name: "Manufacturer / Packer / Importer"
        },
        {
            key: "country_of_origin",
            name: "Country of Origin"
        },
        {
            key: "net_quantity",
            name: "Net Quantity"
        },
        {
            key: "mrp",
            name: "Maximum Retail Price (MRP)"
        },
        {
            key: "manufacturing_date",
            name: "Manufacturing / Packing Date"
        },
        {
            key: "best_before",
            name: "Best Before / Use By"
        },
        {
            key: "consumer_care",
            name: "Consumer Care Details"
        }
    ];


    // ==========================================
    // CHECK EVERY REQUIRED FIELD
    // ==========================================

    for (const field of requiredFields) {

        const item = data[field.key];

        const value = item?.value;

        const confidence = item?.confidence || 0;


        // FIELD PRESENT
        if (value !== null &&
            value !== undefined &&
            value !== "") {

            results.push({

                field: field.name,

                status: "PASS",

                value: value,

                confidence: confidence

            });

        }


        // FIELD MISSING
        else {

            results.push({

                field: field.name,

                status: "FAIL",

                value: null,

                confidence: confidence

            });


            violations.push({

                field: field.name,

                message: `${field.name} is missing`,

                confidence: confidence,

                status: "PENDING"

            });

        }

    }


    // ==========================================
    // CALCULATE CONFIDENCE
    // ==========================================

    const confidenceValues =
        requiredFields.map(field => {

            return data[field.key]?.confidence || 0;

        });


    const averageConfidence =
        confidenceValues.reduce(
            (sum, value) => sum + value,
            0
        ) / confidenceValues.length;


    // Convert 0.91 → 91
    const confidenceScore =
        Number(
            (averageConfidence * 100).toFixed(2)
        );


    // ==========================================
    // OVERALL STATUS
    // ==========================================

    let overallStatus;


    if (violations.length === 0) {

        overallStatus = "COMPLIANT";

    }
    else {

        overallStatus = "POTENTIAL_VIOLATIONS";

    }


    // ==========================================
    // FINAL RESULT
    // ==========================================

    return {

        overallStatus,

        confidenceScore,

        results,

        violations

    };

};


export default checkCompliance;