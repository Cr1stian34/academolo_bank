import { UserService } from "../users/user.service.js"
import { TransferService } from "./transfer.service.js";


export const maketranfer = async(req, res)=>{
    try {
      const {amount, recipientAccountNumber, senderAccountNumber} = req.body

      const recipientUserPromise = UserService.findOneAccount(recipientAccountNumber)
      const senderUserPromise = UserService.findOneAccount(senderAccountNumber);

      const [recipientUser, senderUser] = await Promise.all([recipientUserPromise,senderUserPromise])

      if(!recipientUser){
        return res.status(400).json({
            status: "error",
            message: "El usuario al cual no quieres enviar dinero no existe"
        })
      }

      if(!senderUser){
        return res.status(400).json({
            status: "error",
            message: "El usuario que envia el dinero no existe"
        })
      }

      if(amount> senderUser.amount){
        return res.status(400).json({
            status: "error",
            message: "Saldo insuficiente"
        })
      }

      const newRecipientBalance = amount + recipientUser.amount;
      const newSenderBalance = senderUser.amount - amount;

      const updateRecipientUserPromise = UserService.updateAmount(recipientUser, newRecipientBalance)
      const updateSenderUserPromise = UserService.updateAmount(senderUser, newSenderBalance)
      const transferPromise =  TransferService.createRecordTransfer(amount, senderUser.id, recipientUser.id)

      await Promise.all([updateRecipientUserPromise,updateSenderUserPromise,transferPromise])

      res.status(201).json({
        message: "Transfer ok"
      })
      
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "fail",
            message: "internal server error",
            error
        })
    }
}