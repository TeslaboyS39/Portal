const { User, Transaction, Category, Account } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const { formatRupiah } = require('../helpers/amountFormatter');
const { formatDate } = require('../helpers/dateFormatter');

class Controller {
    static home(req, res) {
        res.render('home')
    }

    static homeAdmin(req, res) {
        if (!req.session.userId) {
            return res.redirect('/login')
        }
        res.render('homeAdmin')
    }

    static homeUser(req, res) {
        if (!req.session.userId) {
            return res.redirect('/login')
        }
        res.render('homeUser')
    }

    static users(req, res) {
        User.findAll()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    }

    static transactionsList(req, res) {
        const userId = req.session.userId;
        console.log("userId:", userId);

        Transaction.findAll({
            where: { UserId: userId },
            include: [User, Category] 
        })
        .then((transactions) => {
            const formattedTransactions = transactions.map((transaction) => {
                return {
                    ...transaction.toJSON(),
                    formatAmount: transaction.formattedAmount(),
                    formatDate: formatDate(transaction.transactionDate),
                };
            });
            res.render('transactionsList', { transactions: formattedTransactions });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    }

    static showAddExpense(req, res) {
        Category.findAll()
        .then(categories => {
            res.render('addExpense', { userId: req.session.userId, categories }); 
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    }

    static addExpense(req, res) {
        const { transactionName, transactionDate, amount, description, transactionType, CategoryId } = req.body;
        const UserId = req.session.userId;

        Transaction.create({
            transactionName,
            transactionDate,
            amount,
            description,
            transactionType,
            CategoryId,
            UserId,
        })
        .then(() => {
            res.redirect('/transactionsList'); 
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
    }

    static showEditExpense(req, res) {
        const transactionId = req.params.id;
        let categoriesData;

        Category.findAll()
        .then(categories => {
            categoriesData = categories;
            return Transaction.findByPk(transactionId, { include: [Category] });
        })
        .then(transaction => {
            if (!transaction) {
                throw new Error("Transaction not found.");
            }
            res.render('editExpense', { userId: req.session.userId, transaction, categories: categoriesData });
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    }

    static editExpense(req, res) {
        const transactionId = req.params.id;
        const { transactionName, transactionDate, amount, description, transactionType, CategoryId } = req.body;

        Transaction.findByPk(transactionId)
        .then(transaction => {
            if (!transaction) {
                throw new Error("Transaction not found.");
            }

            transaction.transactionName = transactionName;
            transaction.transactionDate = transactionDate;
            transaction.amount = amount;
            transaction.description = description;
            transaction.transactionType = transactionType;
            transaction.CategoryId = CategoryId;

            return transaction.save();
        })
        .then(() => {
            res.redirect('/transactionsList');
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    }

    static deleteExpense(req, res) {
        const transactionId = req.params.id;

        Transaction.destroy({
            where: { id: transactionId }
        })
        .then(() => {
            res.redirect('/transactionsList');
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
    }

    static showAddCategory(req, res) {
        res.render('addCategory');
    }

    static addCategory(req, res) {
        const { categoryName } = req.body;

        Category.create({ categoryName })
        .then(() => {
            res.redirect('/transactionsList');
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
    }

    static searchTransactions(req, res) {
        const { searchQuery } = req.query;

        Transaction.findAll({
            where: {
                transactionName: {
                    [Op.iLike]: `%${searchQuery}%` 
                },
                UserId: req.session.userId 
            },
            include: [User, Category]
        })
        .then((transactions) => {
            res.render('transactionsList', { transactions });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
    }

    static register(req, res) {
        res.render('register')
    }

    static createUser(req, res) {
        const { email, password } = req.body;
        // const hashedPassword = bcrypt.hashSync(password, 10);
        User.create({ email, password, role: "user"  })
        .then(user => {
            req.session.userId = user.id;
            req.session.role = user.role;
            // res.redirect('/home')
            res.redirect('/login')
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    }

    static showLoginForm(req, res) {
        res.render('login')
    }

    static login(req, res) {
        const { email, password } = req.body;

        User.findOne({
            where: { email },
        })
        .then((user) => {
            console.log("User:", user);
            if (!user) throw "Unregistered email";
            if (user.role === "admin") {
                if (password !== user.password) {
                  throw "Wrong password!";
                }
                req.session.userId = user.id;
                req.session.role = user.role;
                return res.redirect("/a"); // Ngarahin admin ke halaman /a
            } else {
                const isValidUser = bcrypt.compareSync(password, user.password);
                if (!isValidUser) throw "Wrong password!";
                req.session.userId = user.id;
                req.session.role = user.role;
                console.log("req.session.userId:", req.session.userId);
                return res.redirect("/u"); // Ngarahin user ke halaman /u
            }            
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
    }
}

module.exports = Controller;