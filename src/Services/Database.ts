import * as path from "path";
import {Sequelize} from "sequelize-typescript";
import * as Umzug from "umzug";
import config from "../Config/Config";
import logger from "../Services/Logger";

class Database {

    public sequelize: Sequelize;

    private migrations: Umzug;

    constructor() {
       this.sequelize = new Sequelize(
           {
                database: config.db.database,
                username: config.db.user,
                password: config.db.password,
                dialect: config.db.dialect,
                host: config.db.host,
                logging: logger.debug,
                native: false,
                pool: {
                    acquire: 30000,
                    idle: 10000,
                    max: 5,
                    min: 0,
                },
               modelPaths: [path.join(__dirname, "../Models")],
            });
       this.migrations = new Umzug({
            storage: "sequelize",

            storageOptions: {
                sequelize: this.sequelize,
            },

            migrations: {
                params: [
                    this.sequelize.getQueryInterface(),
                    Sequelize,
                ],
                path: path.join(__dirname, "../Migrations"),
            },
        });

    }

    public async init(): Promise<Sequelize> {
        await this.waitForDb();
        await this.runMigrations();
        return this.sequelize;
    }

    private async waitForDb() {
        while (true) {
            try {
                logger.info(`Connecting to database at ${config.db.host}:3306`);
                await this.sequelize.authenticate();
                logger.info("Database connection has been established successfully.");
                break;
            } catch (e) {
                logger.error("Unable to connect to the database:", e);
                logger.info("Retrying in 3s...");
                await this.sleep(3000);
            }
        }
    }

    private async runMigrations() {
        // Run migrations if not testing
        if (config.env !== "test") {
            logger.info("Running migrations...");
            await this.migrations.up();
            logger.info("Migrations executed successfully");
        }
    }

    private sleep(ms) {

        // eslint-disable-next-line no-undef
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}

export default new Database();
