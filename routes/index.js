const router = require('express').Router();
const Controller = require("../controllers");

router.get('/', Controller.home);
router.get('/a', Controller.homeAdmin);
router.get('/u', Controller.homeUser);
router.get('/users', Controller.users);
router.get('/register', Controller.register);
router.post('/register', Controller.createUser);
router.get('/login', Controller.showLoginForm);
router.post('/login', Controller.login);
router.get('/transactionsList', Controller.transactionsList);
router.get('/addExpense', Controller.showAddExpense);
router.post('/addExpense/:id', Controller.addExpense);
router.get('/editExpense/:id', Controller.showEditExpense);
router.post('/editExpense/:id', Controller.editExpense);
router.get('/deleteExpense/:id', Controller.deleteExpense);
router.get('/addCategory', Controller.showAddCategory);
router.post('/addCategory', Controller.addCategory);
router.get('/search', Controller.searchTransactions);
router.get('/insight', );

module.exports = router;