var model = {
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
      typeEntrie: String,
      quantity: Number,
      weight: Number,
      amount: Number
    }],
    sale:[{
      date: Date,
      name: String,
      cost: Number,
      typeEntrie: String,
      quantity: Number,
      weight: Number,
      amount: Number
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
      description: String,
      date: Date,
      cost: Number,
      active: Boolean

     
    }],
    uncertain: [{
      name: String,
      description: String,
      date: Date,
      cost: Number,
      active: Boolean

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
};
