const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  id: { type: String},
    quotation: {
        totalPrice: { type: Number },
        priceDiscount: { type: Number },
        additionalOffers: [
            {
                name: { type: String,},
                id: { type: String,},
                offer: {
                    id: { type: String,},
                    name: { type: String,},
                    codeIntern: { type: String,},
                    price: { type: Number,},
                    codeRub: { type: String,},
                    dateStart: { type: String},
                    quantity: { type: Number}
                },
                orderCount: [
                  { type: Number},
                ]
            },
        ],
        charges: [
            {
                name:  { type: String},
                price: { type: Number},
                codeIntern: { type: String}
            },
            {
                name:  { type: String},
                price: { type: Number},
                codeIntern: { type: String}
            }
        ],
        transformationDate: { type: String},
        dataTransform: {
            url: { type: String},
            accroche: { type: String }
        },
        _id: { type: String },
        customer: {
            establishmentName: { type: String },
            accountId: { type: String},
            name: { type: String }
        },
        name: { type: String },
        number: { type: String },
        dataTransformUrl: { type: String},
        orderCount: { type: Number}
    },
    createdAt: {type: String}
});



module.exports = mongoose.model('Data', dataSchema);