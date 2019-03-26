mongoose = require('mongoose');
moment = require('moment');


var OrganizationSchema = new mongoose.Schema({
  company: String,
  cnpj: String,
  tradingName: String,
  active: Boolean,
  class: String,
  phone: Number,
  email: String,
  classification: String,
  cellPhone: Number,
  creationDate: { type: Date, default: Date.now },
  activationDate: Date,
  verificationDate: Date,
  creditcard: {},
  supports: [
    {
      solid: {
        materials: {
          paper: {
            name: String,
            used: Boolean
          },
          plastic: {
            name: String,
            used: Boolean
          },
          glass: {
            name: String,
            used: Boolean
          },
          metal: {
            name: String,
            used: Boolean
          },
          isopor: {
            name: String,
            used: Boolean
          },
          tetrapack: {
            name: String,
            used: Boolean
          }
        },
        semiSolid: {},
        liquid: {}
      }
    }
  ],
  units: [
    {
      name: String,
      location: {
        country: String,
        state: String,
        latitude: Number,
        longitude: Number,
        cep: String,
        publicPlace: String,
        neighborhood: String,
        number: Number,
        county: String,
        complement: String
      }
    }
  ],
  users: [
    {
      name: String,
      email: String,
      profile: {
        name: String,
        access: [String]
      },
      password: String,
      active: Boolean
    }
  ],
  entries: {
    purchase:[{
      date: Date,
      name: String,
      cost: Number,
      data: Date
    }],
    sale:[{
      date: Date,
      name: String,
      cost: Number,
      data: Date
    }]

  },
  processingChain: [{
    name: String,
    description: String,
    date: Date,
    active: Boolean,
    hierarchy: [{}],
  }],
  expenses: [{
    date: Date,
    fixed: [{
      name: String,
      typeExpense: String,
      description: String,
      date: Date,
      cost: Number,
      active: Boolean
    }],
    inconstant: [{
      name: String,
      typeExpense: String,
      description: String,
      date: Date,
      quantity: Number,
      weight: Number,
      cost: Number,
      amount: Number
    }],
    uncertain: [{
      name: String,
      typeExpense: String,
      description: String,
      date: Date,
      quantity: Number,
      cost: Number,
      amount: Number
    }]
  }],
  hierarchy: {
    solid: {
      materials: {
        paper: {
          name: String,
          used: Boolean,
          items: [
            {
              name: String,
              active: Boolean,
              pricing: {
                unitPrice: [Number],
                date: [Date],
                weight: Number,
                price: Number,
                dateEntry: Date
              }
            }
          ]
        },
        plastic: {
          name: String,
          used: Boolean,
          items: [
            {
              name: String,
              active: Boolean,
              pricing: {
                unitPrice: [Number],
                date: [Date],
                weight: Number,
                price: Number,
                dateEntry: Date
              }
            }
          ]
        },
        glass: {
          name: String,
          used: Boolean,
          items: [
            {
              name: String,
              active: Boolean,
              pricing: {
                unitPrice: [Number],
                date: [Date],
                weight: Number,
                price: Number,
                dateEntry: Date
              }
            }
          ]
        },
        metal: {
          name: String,
          used: Boolean,
          items: [
            {
              name: String,
              active: Boolean,
              pricing: {
                unitPrice: [Number],
                date: [Date],
                weight: Number,
                price: Number,
                dateEntry: Date
              }
            }
          ]
        },
        isopor: {
          name: String,
          used: Boolean,
          items: [
            {
              name: String,
              active: Boolean,
              pricing: {
                unitPrice: [Number],
                date: [Date],
                weight: Number,
                price: Number,
                dateEntry: Date
              }
            }
          ]
        },
        tetrapack: {
          name: String,
          used: Boolean,
          items: [
            {
              name: String,
              active: Boolean,
              pricing: {
                unitPrice: [Number],
                date: [Date],
                weight: Number,
                price: Number,
                dateEntry: Date

              }
            }
          ]
        }
      },
      semisolid: {},
      liquid: {}
    }
  },
  vehicles: [
    {
      carPlate: String,
      emptyVehicleWeight: Number,
      weightCapacity: Number,
      active: Boolean,
      fuel: Number,
      typeFuel: String
    }
  ],
  georoutes: [
    {
      name: String,
      archived: Boolean,
      status: String,
      distance: Number,
      schedules: [
        {
          date: Date,
          startTime: Date,
          endTime: Date,
          situation: String,
          archived: Boolean,
          vehicle: {
            carPlate: String,
            emptyVehicleWeight: Number,
            weightCapacity: Number,
            active: Boolean,
            fuel: Number,
            typeFuel: String
          }
        }
      ]
    }
  ]
});
var organizationModel = mongoose.model('Organization', OrganizationSchema);

const express = require('express');
(path = require('path')),
  (bodyParser = require('body-parser')),
  (cors = require('cors'));
var organizations = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const TestURL = 'mongodb://reconsidere-enterprise:by4yY5A4@devops.reconsidere.online:27017/reconsideredb'
const options = {
  autoIndex: false,
  reconnectTries: 30,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0
};

mongoose.connect(TestURL, options).catch(err => {
  console.error('ERE002' + err.stack);
});

organizations.route('/add').post(function (req, res) {
  var organization = new organizationModel(req.body);
  organization
    .save()
    .then(item => {
      res.status(200).json({ Organizations: 'SRE001' });
    })
    .catch(err => {
      res.status(400).send('ERE006' + err.stack);
    });
});

organizations.route('/organizationid/:id').get(function (req, res, next) {
  organizationModel.findOne({ 'users._id': req.params.id }, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      res.json(org._id);
    }
  });
});


organizations.route('/:id').get(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (err) {
      return next(new Error(res.status(400).send('ERE005')));
    } else {
      res.json(org);
    }
  });
});


organizations.route('/edit/:id').get(function (req, res, next) {
  var id = req.params.id;
  organizationModel.findById(id, function (err, organization) {
    if (err) {
      return next(new Error(res.status(400).send('ERE008')));
    } else {
      res.json(organization);
    }
  });
});


organizations.route('/update/:id').put(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      org.email = req.body.email;
      org.company = req.body.company;
      org.tradingName = req.body.tradingName;
      org.password = req.body.password;
      org.cnpj = req.body.cnpj;
      org.phone = req.body.phone;
      org.cellPhone = req.body.cellPhone;
      org.classification = req.body.classification;
      org.units = req.body.units;
      org.vehicles = req.body.vehicles;
      org.georoutes = req.body.georoutes;
      org.users = req.body.users;
      org.hierarchy = req.body.hierarchy;

      org
        .save()
        .then(org => {
          res.json('SRE001');
        })
        .catch(err => {
          return next(new Error(res.status(400).send('ERE006')));
        });
    }
  });
});

organizations.route('/:id/user').get(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (err) {
      return next(new Error(res.status(400).send('ERE008')));
    } else {
      res.json(org.users);
    }
  });
});

organizations.route('/user/authenticate').post(function (req, res, next) {
  organizationModel.findOne(
    { 'users.email': req.body.email },
    { 'users.$': 1 },
    function (err, org) {
      if (!org) {
        return next(new Error(res.status(400).send('ERE001')));
      }
      else {
        res.json(org.users[0]);
      }
    }
  );
});

organizations.route('/add/user/:id').post(function (req, res, next) {
  organizationModel.findOne(
    { _id: req.params.id, 'users.email': req.body.email },
    function (err, obj) {
      if (obj) {
        return next(new Error(res.status(400).send('WRE005')));
      } else {
        organizationModel.findById(req.params.id, function (err, org) {
          if (!org) return next(new Error(res.status(400).send('ERE005')));
          else {
            (req.body.password = req.body.password), 10;
            org.users.push(req.body);
            org
              .updateOne(org)
              .then(org => {
                res.json('SRE001');
              })
              .catch(err => {
                return next(new Error(res.status(400).send('ERE006')));
              });
          }
        });
      }
    }
  );
});

organizations.route('/update/user/:id').post(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      var user = org.users.id(req.body._id);
      if (!user) {
        org.users.push(req.body);
        org
          .update(org)
          .then(org => {
            res.json('SRE001');
          })
          .catch(err => {
            return next(new Error(res.status(400).send('ERE006')));
          });
      } else {
        user.set(req.body);
        org
          .update(org)
          .then(org => {
            res.json('SRE001');
          })
          .catch(err => {
            return next(new Error(res.status(400).send('ERE006')));
          });
      }
    }
  });
});

organizations.route('/vehicle/:id').get(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (err) {
      return next(new Error(res.status(400).send('ERE008')));
    } else {
      res.json(org.vehicles);
    }
  });
});

organizations.route('/add/vehicle/:id').post(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      org.vehicles.push(req.body);
      org
        .update(org)
        .then(org => {
          res.json('SRE001');
        })
        .catch(err => {
          return next(new Error(res.status(400).send('ERE006')));
        });
    }
  });
});

organizations.route('/update/vehicle/:id').put(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      var vehicle = org.vehicles.id(req.body._id);
      if (!vehicle) {
        org.vehicles.push(req.body);
        org
          .update(org)
          .then(org => {
            res.json('SRE001');
          })
          .catch(err => {
            return next(new Error(res.status(400).send('ERE006')));
          });
      } else {
        vehicle.set(req.body);
        org
          .update(org)
          .then(org => {
            res.json('SRE001');
          })
          .catch(err => {
            return next(new Error(res.status(400).send('ERE006')));
          });
      }
    }
  });
});

organizations
  .route('/remove/vehicle/:organizationId/:id')
  .delete(function (req, res) {
    organizationModel.findById(req.params.organizationId, function (err, org) {
      if (!org) return next(new Error(res.status(400).send('ERE005')));
      else {
        var vehicle = org.vehicles.id(req.params.id);
        if (vehicle) {
          vehicle.remove({ _id: req.params.id });
          org
            .update(org)
            .then(org => {
              res.json('SRE001');
            })
            .catch(err => {
              return next(new Error(res.status(400).send('ERE006')));
            });
        }
      }
    });
  });
organizations.route('/scheduler/:id').get(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (err) {
      return next(new Error(res.status(400).send('ERE008')));
    } else {
      res.json(org.georoutes);
    }
  });
});

organizations.route('/add/scheduler/:id').post(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      org.georoutes = req.body;
      org
        .save(org)
        .then(org => {
          res.json('SRE001');
        })
        .catch(err => {
          return next(new Error(res.status(400).send('ERE006')));
        });
    }
  });
});

organizations.route('/update/scheduler/:id').put(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      var route = org.georoutes.id(req.body._id);
      if (!route) {
        org.georoutes = req.body;
        org
          .update(org)
          .then(org => {
            res.json('SRE001');
          })
          .catch(err => {
            return next(new Error(res.status(400).send('ERE006')));
          });
      } else {
        route.set(req.body);
        org
          .update(org)
          .then(org => {
            res.json('SRE001');
          })
          .catch(err => {
            return next(new Error(res.status(400).send('ERE006')));
          });
      }
    }
  });
});

organizations
  .route('/remove/scheduler/:organizationId/:id')
  .delete(function (req, res) {
    organizationModel.findById(req.params.organizationId, function (err, org) {
      if (!org) return next(new Error(res.status(400).send('ERE005')));
      else {
        var route = org.georoutes.id(req.params.id);
        if (route) {
          route.remove({ _id: req.params.id });
          org
            .update(org)
            .then(org => {
              res.json('SRE001');
            })
            .catch(err => {
              return next(new Error(res.status(400).send('ERE006')));
            });
        }
      }
    });
  });

organizations.route('/hierarchy/:id').get(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (err) {
      return next(new Error(res.status(400).send('ERE008')));
    } else {
      res.json(org.hierarchy);
    }
  });
});

organizations.route('/add/hierarchy/:id').post(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      org.hierarchy = req.body;
      org
        .update(org)
        .then(org => {
          res.json('SRE001');
        })
        .catch(err => {
          return next(new Error(res.status(400).send('ERE006')));
        });
    }
  });
});

organizations.route('/pricing/:id').get(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (err) {
      return next(new Error(res.status(400).send('ERE008')));
    } else {
      res.json(org.hierarchy);
    }
  });
});

organizations.route('/add/pricing/:id').post(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      org.hierarchy = req.body;
      org
        .update(org)
        .then(org => {
          res.json('SRE001');
        })
        .catch(err => {
          return next(new Error(res.status(400).send('ERE006')));
        });
    }
  });
});

organizations.route('/processingchain/:id').get(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (err) {
      return next(new Error(res.status(400).send('ERE008')));
    } else {
      res.json(org.processingChain);
    }
  });
});

organizations.route('/update/processingchain/:id').put(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      org.processingChain = req.body;
      org
        .update(org)
        .then(org => {
          res.json('SRE001');
        })
        .catch(err => {
          return next(new Error(res.status(400).send('ERE006')));
        });
    }
  });
});


organizations.route('/expenses/:id/:date').get(function (req, res, next) {
  var month = moment(new Date(req.params.date)).format('M');
  var year = moment(new Date(req.params.date)).format('YYYY');
  organizationModel.aggregate([
    { $unwind: "$expenses" },
    { $match: { '_id': mongoose.Types.ObjectId(req.params.id) } },
    { $project: { "date": { "$month": "$expenses.date" }, "year": { "$year": "$expenses.date" }, document: "$expenses" } }, { "$match": { "date": Number(month), "year": Number(year) } },

  ]).exec(function (err, org) {
    if (err) {
      console.log(err);
      return next(new Error(res.status(400).send('ERE008')));
    }
    else {
      if (org[0] !== undefined && org[0].document !== undefined) {
        res.json(org[0].document);
      } else {
        res.json(org[0]);
      }
    }
  });
});

organizations.route('/update/expenses/:id').put(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      org.expenses = req.body;
      org
        .update(org)
        .then(org => {
          res.json('SRE001');
        })
        .catch(err => {
          console.log(err);
          return next(new Error(res.status(400).send('ERE006')));
        });
    }
  });
});

organizations.route('/add/expenses/:id').post(function (req, res, next) {
  organizationModel.findById(req.params.id, function (err, org) {
    if (!org) return next(new Error(res.status(400).send('ERE005')));
    else {
      let obj = {
        date: req.body[0].date,
        fixed: req.body[0].fixed,
        uncertain: req.body[0].uncertain,
        inconstant: req.body[0].inconstant,
      }
      if (org.expenses === undefined || org.expenses.length <= 0) {
        org.expenses = obj;
      } else {
        org.expenses.push(obj)
      }
      org
        .save()
        .then(org => {
          res.json('SRE001');
        })
        .catch(err => {
          return next(new Error(res.status(400).send('ERE006')));
        });
    }
  });
});

app.use('/organization', organizations);
module.exports = app;
