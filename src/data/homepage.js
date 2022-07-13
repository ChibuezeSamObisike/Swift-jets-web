import {v4} from "uuid";

export const homePageData = {
    hero: {
        items: [
            {
                id: v4(),
                title: 'SwiftJet 4',
                description: 'S4',
                image: require('../static/images/clay_lacy_photo.5f8f3429968cc.avif')
            },
            {
                id: v4(),
                title: 'SwiftJet 4',
                description: 'S4',
                image: require('../static/images/blog_02.jpg')
            },
            {
                id: v4(),
                title: 'SwiftJet 1',
                description: 'Some random description of our jet',
                image: require("../static/images/wp2146686.webp")
            },
            {
                id: v4(),
                title: 'SwiftJet 1',
                description: 'S1',
                image: require('../static/images/plane-large.png')
            },
            {
                id: v4(),
                title: 'SwiftJet 1',
                description: 'S3',
                image: require('../static/images/getty-private-corporate-jet.webp')
            }
        ]
    },
    bookingForm: {
        terminals: [
            {
                id: v4(),
                name: '',
                city: ''
            },
            {
                id: v4(),
                name: "Private Jet Terminal",
                city: "Abuja"
            },
            {
                id: v4(),
                name: "Bristol Terminal",
                city: "Lagos"
            },
            {
                id: v4(),
                name: "NAF Base Terminal",
                city: "Port Harcourt"
            },
        ],
        categories: [
            {
                id: v4(),
                name: '',
                value: ''
            },
            {
                id: v4(),
                name: 'One Way',
                value: 'ONE WAY'
            },
            {
                id: v4(),
                name: 'Round Trip',
                value: 'ROUND TRIP'
            },
        ]
    }
}