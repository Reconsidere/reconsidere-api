model = [{
    name: String,
    email: String,
    cpf: String,
    password: String,
    birthday: Date,
    creationDate: Date,
    sex: String,
    location: {
        state: String,
        cep: String,
        publicPlace: String,
        neighborhood: String,
        number: Number,
        county: String,
        complement: String
    },
    materials: [String],
    scheduling: [{
        date: Date,
        hour: Date,
        location: {
            state: String,
            cep: String,
            publicPlace: String,
            neighborhood: String,
            number: Number,
            county: String,
            complement: String
        },
        weight: Number,
        description: String,
        quantity: Number,
        picture: String
    }]

}]
