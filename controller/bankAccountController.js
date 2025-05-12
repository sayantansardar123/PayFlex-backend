const BankName = require("../model/bankNameModel");
const BankAccount = require("../model/bankAccountModel");



exports.createBankName = async (req, res, next) => {
  try {
    const { bankName, ifsc, logo } = req.body;
    
    const bankObj = { bankName, IFSC: ifsc, logo };
    await new BankName(bankObj).save();

    res.status(200).send({ success: true, message: "Bank Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};


exports.getAllBanks = async (req, res, next) => {
  try {
    const allBanks = await BankName.find();
    if (!allBanks) {
      return res.status(400).send({ message: "Banks Not Found" });
    }
    res.status(200).send(allBanks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};


exports.createBankAccount = async (req, res, next) => {
  try {
    const { userId, bankId, bankName, logo } = req.body;
    let bankAccount = await BankAccount.findOne({ userId: userId });
    if (bankAccount) {
      return res.status(400).send({ message: "BankAccount of this user already exists." });
    }

    const bankAccountObj = { userId, bankId, bankName, logo };
    bankAccount = await new BankAccount(bankAccountObj).save();

    res.status(200).send({ 
      message: "Account Created Successfully",
      accountNo: bankAccount._id
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};


exports.getBankAccountsOfUser = async (req, res, next) => {
  try {
    const bankAccounts = await BankAccount.find({ userId: req.userId });
    if (!bankAccounts) {
      return res.status(400).send({ message: "Banks Not Found" });
    }

    res.status(200).send(bankAccounts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}