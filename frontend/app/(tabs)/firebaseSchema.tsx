export const fiberNetworkSchema = {
    FiberLines: {
        id: "string",
        coordinates: [{ latitude: "number", longitude: "number" }],
        fiberType: "string", // FTTH, FTTP, FTTB
        provider: "string", // Airtel, Jio, etc.
        status: "string", // Active/Under Maintenance
    },
    FiberJunctions: {
        id: "string",
        location: { latitude: "number", longitude: "number" },
        capacity: "number",
        latency: "number",
        bandwidth: "number",
    },
    FiberSources: {
        id: "string",
        location: { latitude: "number", longitude: "number" },
        distanceToNearestArea: "number",
    },
    Households: {
        id: "string",
        location: { latitude: "number", longitude: "number" },
        isp: "string",
        status: "string", // Connected/Pending
    },
    FeasibilityZones: {
        id: "string",
        location: { latitude: "number", longitude: "number" },
        potential: "boolean",
        distanceToFiberNode: "number",
    },
    PendingRequests: {
        id: "string",
        location: { latitude: "number", longitude: "number" },
        status: "string", // Pending, Approved, Rejected
        expectedInstallationDate: "string",
    },
};
