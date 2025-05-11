const Transaction = require("../model/transactionModel");
const User = require("../model/user.model");
const BankAccount = require("../model/bankAccountModel");



exports.createTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findOne({ _id: transactionId });
    if (!transaction) {
      return res.status(400).send({ message: "Transaction Not Found" });
    }

    res.status(200).send(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};


exports.sendMoney = async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  try {
    const senderObj = await User.findById(senderId);
    const receiverObj = await User.findById(receiverId);

    if (!senderObj || !receiverObj){
      return res.status(404).send({ message: 'User not found'});
    }

    // Update balances
    const senderBank = await BankAccount.findOne({ userId: senderId });
    const receiverBank = await BankAccount.findOne({ userId: receiverId });

    if(!senderBank || !receiverBank){
      return res.status(404).send({ message: "Bank Account not found" });
    }

    if(senderBank.balance < amount) {
      return res.status(400).send({ message: 'Insufficient balance' });
    }

    senderBank.balance -= Number(amount);
    receiverBank.balance += Number(amount);
    console.log(receiverBank.balance);

    await senderBank.save();
    await receiverBank.save();

    // Create transactions Object
    const transactionObj = {
      sender: {
        id: senderId,
        name: senderObj.username,
        upiId: senderObj.upiId
      },
      receiver: {
        id: receiverId,
        name: receiverObj.username,
        upiId: receiverObj.upiId
      },
      amount: amount
    };
    //await Transaction.create({ sender: senderId, receiver: receiverId, amount});

    const transaction = await new Transaction(transactionObj).save();
    //console.log('Transaction', transaction);

    res.status(200).send({
      success: true,
      message: `Transaction successful. TransactionId: ${transaction._id}`
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: err.message });
  }
};


exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).send({ message: "User not found" });
    }

    const transactions = await Transaction.find({
      $or: [
        { 'sender.id': userId },
        { 'receiver.id': userId }
      ]
    })
    .sort({ createdAt: -1 });

    const formattedTransactions = transactions.map((tx) => {
      const senderId = tx.sender.id.toString();
      return {
        id: tx._id,
        type: txnType = senderId === userId ? 'debit' : 'credit',
        title: senderId === userId ? 'Paid to' : 'Received from',
        name: senderId === userId ? tx.receiver.name : tx.sender.name,
        amount: '₹' + tx.amount, 
        time: tx.createdAt,
        status: senderId === userId ? 'Debited from' : 'Credited to'
      }
    });

    res.status(200).send(formattedTransactions);
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: 'Error retrieving transactions' });
  }
};

