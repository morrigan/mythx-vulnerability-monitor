import app from "./App";
import config from "./Config/Config";
import database from "./Services/Database";
import logger from "./Services/Logger";

database.init().then(() => {
    app.listen(config.port, (err) => {
        if (err) {
            return logger.error(err);
        }

        return logger.info(`Server is listening on ${config.port}`);
    });
});
