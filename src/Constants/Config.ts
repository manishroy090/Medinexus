import { Hoshpital } from "../db/models/Hoshpital";
import { JWT_SECRET } from "./App";
import "dotenv/config";

export default () =>({
    port :'8080',
    TABLE_PREFIX : process.env.Admin_DB_Name,
    JWT_SECRET :process.env.JWT_SECRET,
    mainDatabase : {
        DB_NAME:process.env.Admin_DB_Name,
    },
    ORGANIZATION: {
        HOSHPITAL:'HOSHPITAL',
        BLOODBANK:'BLOODBANK'
    },
    openBanking : {

    }
    ,
    card :{


    }
    ,

    Strip : {

    }
    ,
    mail :{


    },

    azure_blob : {

    },

    postal_secret : {

    },

    base_url :{


    }
    
})