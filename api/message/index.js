module.exports = async function (context, req) {
    try {
        // Minimal validation
        if (!req.body) {
            context.res = { status: 400, body: "Invalid request" };
            return;
        }

        // Prepare the data for Blob Storage
        const data = JSON.stringify(req.body);

        // The function returns the data, which is automatically saved to Blob Storage due to the output binding
        return data;
    } catch (error) {
        context.res = { status: 500, body: `An error occurred: ${error.message}` };
    }
};
