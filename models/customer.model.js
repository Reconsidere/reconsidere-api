model = [{
    name: String,
    email: String,
    cpf: String,
    password: String,
    birthday: Date,
    creationDate: Date,
    sex: String,
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
}]
