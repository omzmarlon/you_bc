const VerificationStatus = {
    VERIFICATION_SUCCESS: 200,
    UNVERIFIED: 401,
    UNKNOWN: -1
};

if (Object.freeze) {
    Object.freeze(VerificationStatus);
}

export default VerificationStatus;