const now = new Date();
const queryFilters: Array<Array<string>> = [];

// query for this hour
const oneHourAgo = new Date(now.getTime() - 3600000);

// query for last 24 hours
const oneDayAgo = new Date(now.getTime() - 86400000);

// query for last 7 days
const oneWeekAgo = new Date(now.getTime() - 604800000);

// query for season - start date February 2nd 2024
const seasonStart = new Date("2024-02-02T00:00:00.000Z");

// given string time, return query
function fetchTimeQuery(time: string) {
    queryFilters.length = 0;
    switch (time) {
        case "hour":
            queryFilters.push(['created_on', 'gt', oneHourAgo.toISOString()]);
            break;

        case "day":
            queryFilters.push(['created_on', 'gt', oneDayAgo.toISOString()]);
            break;

        case "week":
            queryFilters.push(['created_on', 'gt', oneWeekAgo.toISOString()]);
            break;

        case "season":
            queryFilters.push(['created_on', 'gt', seasonStart.toISOString()]);
            break;

        default:
            queryFilters.push(['gt', 'created_on', oneHourAgo.toISOString()]);
    };
};

// fetch frames
export async function fetchFrames(time: string, offset: number = 0, limit: number = 5) {
    return [];
};

// fetch tweet count
export async function fetchFrameCount(time: string) {
    fetchTimeQuery(time);
    return 0;
};
