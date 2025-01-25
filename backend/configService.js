const environmentVariable = {
    EXPOSE_PORT: process.env.EXPOSE_PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017",
    JWT_KEY: process.env.JWT_KEY || "42"
};

export default {
    environmentVariable
};

