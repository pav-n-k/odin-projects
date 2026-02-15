export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "test",
                "chore",
                "revert",
            ],
        ],
        "type-empty": [2, "never"],
        "subject-empty": [2, "never"],
        "type-case": [2, "always", "lower-case"],
        "subject-full-stop": [2, "never", "."],
        "header-max-length": [2, "always", 80],
    },
};
