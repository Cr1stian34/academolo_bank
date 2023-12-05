import { Sequelize } from "sequelize";
import envs from "../enviroments/enviroments.js";

export const sequelize = new Sequelize(envs.DB_URL, {
    logging: false
})

export async function authenticated(){
    try {
        await sequelize.authenticate();
        console.log("La conexion a sido autenticada satisfactoriamente :)")
    } catch (error) {
        console.log(error)
    }
}

export async function syncUp(){
    try {
        await sequelize.sync();
        console.log("La conexion a sido sincronizada satisfactoriamenet ;)")
    } catch (error) {
        console.log(error)
    }
}

