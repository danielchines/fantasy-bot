require("dotenv").config();
import getBoxscores from "./src/getBoxscores";
import getSummaryText from "./src/getSummaryText";
import sendGroupmeMsg from "./src/sendGroupmeMsg";
import getCurrentWeek from "./src/getCurrentWeek";

export const handler = async (event: any = {}): Promise<any> => {
  try {
    const { seasonId, currentWeek, finalWeek } = await getCurrentWeek();

    if (currentWeek > finalWeek) {
      return { statusCode: 200, body: "The season is over :(" };
    }

    const scores = await getBoxscores(seasonId, currentWeek);
    const summaryText = getSummaryText(currentWeek, scores);

    await sendGroupmeMsg(summaryText);

    return { statusCode: 200, body: "It worked!" };
  } catch (err) {
    console.log("ERROR:", err);
    return { statusCode: 500, body: "Server Error. Check the logs" };
  }
};
