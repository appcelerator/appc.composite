var should = require('should');
var async = require('async');
var utils = require('./utils')();

describe('Composite - One to One', function () {

	beforeEach(function (next) {
		utils.loadModelsToServer('db-one-to-one');
		async.series([
			function (done) {
				utils.server().models.Customer.create({
					name: 'Michael Jordan'
				}, function (err, instance) {
					if (err) {
						done(err);
					} else {
						utils.addInstance('Customer', instance);
						done(null, instance);
					}
				});
			},
			function (done) {
				utils.server().models.Customer.create({
					name: 'Kevin Garnet'
				}, function (err, instance) {
					if (err) {
						done(err);
					} else {
						utils.addInstance('Customer', instance);
						done(null, instance);
					}
				});
			},
			function (done) {
				utils.server().models.Customer.create({
					name: 'Kobe Bryant'
				}, function (err, instance) {
					if (err) {
						done(err);
					} else {
						utils.addInstance('Customer', instance);
						done(null, instance);
					}
				});
			},
			function (done) {
				utils.server().models.Address.create({
					street: 'Street 1',
					customerId: utils.server().instances.Customer[0].getPrimaryKey()
				}, function (err, instance) {
					if (err) {
						done(err);
					} else {
						utils.addInstance('Address', instance);
						done(null, instance);
					}
				});
			},
			function (done) {
				utils.server().models.Address.create({
					street: 'Street 2',
					customerId: utils.server().instances.Customer[1].getPrimaryKey()
				}, function (err, instance) {
					if (err) {
						done(err);
					} else {
						utils.addInstance('Address', instance);
						done(null, instance);
					}
				});
			}
		], next);
	});

	it('[RDPP-4451] Left Join - One to One with Object', function(next) {
		utils.server().models.CustomerInfo1.find(validate);

		function validate(err, result) {
			should(result.length).equal(3);
			should(result[0].customer).be.Object();
			should(result[0].address).be.Object();
			should(result[1].customer).be.Object();
			should(result[1].address).be.Object();
			next();
		}
	});

	/**
	 * When the field is alased the Object type is ignored and string is returned instead of the whole Object
	 */
	it('[RDPP-4451] Left Join - One to One with Aliased Object', function (next) {
		utils.server().models.CustomerInfo7.find(validate);
		function validate(err, result) {
			should(result.length).equal(3);
			should(result[0].customer).be.Object();
			should(result[0].address).be.String();
			should(result[0].address).equal(utils.server().instances.Address[0].street);
			should(result[1].customer).be.Object();
			should(result[1].address).be.String();
			next();
		}
	});

	/**
	 * When not aliased although it is defined as String the field is populated with Array that contain the whole object.
	 * TODO: Should we fix this.
	 * Ticket: https://techweb.axway.com/jira/browse/RDPP-4454
	 */
	it('[RDPP-4451] Left Join - One to One with String', function (next) {
		utils.server().models.CustomerInfo3.find(validate);
		function validate(err, result) {
			should(result.length).equal(3);
			should(result[0].customer).be.Object();
			should(result[0].street).be.Array();
			should(result[1].customer).be.Object();
			should(result[1].street).be.Array();
			next();
		}
	});

	/**
	 * When the field is aliased it works as expected having the joined values as strings
	 */
	it('[RDPP-4451] Left Join - One to One with Aliased String', function (next) {
		utils.server().models.CustomerInfo2.find(validate);

		function validate(err, result) {
			should(result.length).equal(3);
			should(result[0].customer).be.Object();
			should(result[0].address).be.String();
			should(result[1].customer).be.Object();
			should(result[1].address).be.String();
			next();
		}
	});

	it('[RDPP-4451] Inner Join - One to One with Object', function (next) {
		utils.server().models.CustomerInfo4.find(validate);

		function validate(err, result) {
			should(result.length).equal(2);
			should(result[0].customer).be.Object();
			should(result[0].address).be.Object();
			should(result[1].customer).be.Object();
			should(result[1].address).be.Object();
			next();
		}
	});

	/**
	 * When the field is alased the Object type is ignored and string is returned instead of the whole Object
	 * Ticket: https://techweb.axway.com/jira/browse/RDPP-4461
	 */
	it('[RDPP-4451] Inner Join - One to One with Aliased Object', function (next) {
		utils.server().models.CustomerInfo8.find(validate);
		function validate(err, result) {
			should(result.length).equal(2);
			should(result[0].customer).be.Object();
			should(result[0].address).be.String();
			should(result[0].address).equal(utils.server().instances.Address[0].street);
			should(result[1].customer).be.Object();
			should(result[1].address).be.String();
			should(result[1].address).equal(utils.server().instances.Address[1].street);
			next();
		}
	});

	/**
	 * When not aliased although it is defined as String the field is populated with Array that contain the whole object.
	 * TODO: Should we fix this.
	 * Ticket: https://techweb.axway.com/jira/browse/RDPP-4454
	 */
	it('[RDPP-4451] Inner Join - One to One with String', function (next) {
		utils.server().models.CustomerInfo6.find(validate);
		function validate(err, result) {
			should(result.length).equal(2);
			should(result[0].customer).be.Object();
			should(result[0].street).be.Array();
			should(result[1].customer).be.Object();
			should(result[1].street).be.Array();
			next();
		}
	});

	/**
	 * Ticket: https://techweb.axway.com/jira/browse/RDPP-4461
	 */
	it(' [RDPP-4451] Inner Join - One to One with Aliased String', function (next) {
		utils.server().models.CustomerInfo5.find(validate);

		function validate(err, result) {
			should(result.length).equal(2);
			should(result[0].customer).be.Object();
			should(result[0].address).be.String();
			should(result[1].customer).be.Object();
			should(result[1].address).be.String();
			next();
		}
	});
});
