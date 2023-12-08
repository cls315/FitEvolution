const { Client } = require("../../db");

const backupPayment=async(receipt_email,amountpayment,currency,description,payment_method_types,payment_method)=>{
    const paymentDate = new Date(); // Convert seconds to milliseconds 

//primero busco el backup antiguo del cliente
const existingClient = await Client.findOne({ where: { email: receipt_email } });

if (existingClient) {
    // Convertir backups a un array
    const currentBackups = Array.isArray(existingClient.backups)
      ? existingClient.backups
      : Object.values(existingClient.backups);
//-------------------------------------------
//agrego los nuevos datos de pago conservando los datos de pagos antiguos
const newBackups=[paymentDate,receipt_email,amountpayment,currency,description,payment_method_types,payment_method]
const updatedBackups = [...currentBackups,newBackups];
console.log( updatedBackups)
//-----------------------------------------------------------------------
    await Client.update(
        { backups: updatedBackups },
        { where: { email: receipt_email } }
      )

}
}


module.exports= backupPayment;