module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|ts|tsx)?$": "ts-jest",
    },
    transformIgnorePatterns: ["node_modules/(?!(atomico|@atomico)/)"],
};
