import { Hoshpital } from "../db/models/Hoshpital";
import { JWT_SECRET } from "./App";

export default () =>({
    port :'8080',
    TABLE_PREFIX : 'health_care_manish_ray',
    JWT_SECRET : 'supersecret',
    mainDatabase : {
        DB_NAME:"healthCareb"
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