const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('../models/Category');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const Customer = require('../models/Customer');
const Sale = require('../models/Sale');
const User = require('../models/User');
const Stock = require('../models/Stock');

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected.');
        }

        // --- CLEANUP ---
        console.log('Cleaning up existing data...');
        await Promise.all([
            Category.deleteMany({}),
            Product.deleteMany({}),
            Supplier.deleteMany({}),
            Customer.deleteMany({}),
            Sale.deleteMany({}),
            Stock.deleteMany({})
            // User.deleteMany({}) // Optional: Keep users or reset? Let's keep admin if exists
        ]);

        // --- USERS ---
        console.log('Seeding Users...');
        let admin = await User.findOne({ role: 'ADMIN' });
        if (!admin) {
            admin = await User.create({
                email: 'admin@pharmacy.com',
                password: 'password123',
                name: 'Admin User',
                role: 'ADMIN',
                isActive: true
            });
        }

        let cashier = await User.findOne({ email: 'cashier@pharmacy.com' });
        if (!cashier) {
            cashier = await User.create({
                email: 'cashier@pharmacy.com',
                password: 'password123',
                name: 'Sarah Cashier',
                role: 'CASHIER',
                isActive: true
            });
        }

        // --- CATEGORIES ---
        console.log('Seeding Categories...');
        const categoriesData = [
            { name: 'Tablets', description: 'Oral solid dosage forms' },
            { name: 'Capsules', description: 'Encapsulated medicines' },
            { name: 'Syrups', description: 'Liquid formulations' },
            { name: 'Injections', description: 'Parenteral preparations' },
            { name: 'Antibiotics', description: 'Bacterial infection treatments' },
            { name: 'Pain Relief', description: 'Analgesics and Antipyretics' },
            { name: 'Vitamins', description: 'Supplements' },
            { name: 'Skin Care', description: 'Dermatological products' },
            { name: 'First Aid', description: 'Surgicals and dressings' }
        ];
        const categories = await Category.insertMany(categoriesData);
        const catMap = categories.reduce((acc, cat) => ({ ...acc, [cat.name]: cat._id }), {});

        // --- SUPPLIERS ---
        console.log('Seeding Suppliers...');
        const suppliersData = [
            { name: 'Health Distributors Ltd.', contactPerson: 'John Doe', phone: '042-111-222', email: 'johnd@healthdist.com', status: 'Active' },
            { name: 'PharmaCare Inc.', contactPerson: 'Jane Smith', phone: '021-333-444', email: 'sales@pharmacare.com', status: 'Active' },
            { name: 'MediSupply Co.', contactPerson: 'Ali Khan', phone: '051-555-666', email: 'ali@medisupply.com', status: 'Active' },
            { name: 'Global Pharma', contactPerson: 'Robert Brown', phone: '042-999-888', email: 'robert@globalpharma.com', status: 'Active' },
            { name: 'City Medicals', contactPerson: 'Emily White', phone: '021-777-666', email: 'orders@citymeds.com', status: 'Active' }
        ];
        const suppliers = await Supplier.insertMany(suppliersData);

        // --- PRODUCTS & STOCKS ---
        console.log('Seeding Products and Stock...');

        const baseProducts = [
            { name: 'Panadol Regular', generic: 'Paracetamol', cat: 'Pain Relief', price: 2.5, cost: 1.5, mfr: 'GSK' },
            { name: 'Panadol Extra', generic: 'Paracetamol/Caffeine', cat: 'Pain Relief', price: 3.5, cost: 2.0, mfr: 'GSK' },
            { name: 'Brufen 400mg', generic: 'Ibuprofen', cat: 'Pain Relief', price: 5.0, cost: 3.0, mfr: 'Abbott' },
            { name: 'Disprin', generic: 'Aspirin', cat: 'Pain Relief', price: 1.0, cost: 0.5, mfr: 'Reckitt' },
            { name: 'Augmentin 625mg', generic: 'Co-Amoxiclav', cat: 'Antibiotics', price: 25.0, cost: 18.0, mfr: 'GSK' },
            { name: 'Augmentin 1g', generic: 'Co-Amoxiclav', cat: 'Antibiotics', price: 40.0, cost: 30.0, mfr: 'GSK' },
            { name: 'Amoxil 500mg', generic: 'Amoxicillin', cat: 'Antibiotics', price: 12.0, cost: 8.0, mfr: 'GSK' },
            { name: 'Velosef 500mg', generic: 'Cephradine', cat: 'Antibiotics', price: 15.0, cost: 10.0, mfr: 'Squibb' },
            { name: 'Cac-1000 Plus', generic: 'Calcium/Vit D', cat: 'Vitamins', price: 180.0, cost: 140.0, mfr: 'GSK' },
            { name: 'Surbex Z', generic: 'Multivitamin', cat: 'Vitamins', price: 250.0, cost: 200.0, mfr: 'Abbott' },
            { name: 'Neurobion', generic: 'Vitamin B Complex', cat: 'Vitamins', price: 10.0, cost: 6.0, mfr: 'Merck' },
            { name: 'Sunny D', generic: 'Vitamin D3', cat: 'Vitamins', price: 15.0, cost: 10.0, mfr: 'Getz' },
            { name: 'Rigix', generic: 'Cetirizine', cat: 'Tablets', price: 8.0, cost: 4.0, mfr: 'Getz' },
            { name: 'Arinac', generic: 'Ibuprofen/Pseudoephedrine', cat: 'Tablets', price: 12.0, cost: 8.0, mfr: 'Abbott' },
            { name: 'Flagyl 400mg', generic: 'Metronidazole', cat: 'Antibiotics', price: 4.0, cost: 2.0, mfr: 'Sanofi' },
            { name: 'Entamizole DS', generic: 'Metronidazole/Diloxanide', cat: 'Tablets', price: 6.0, cost: 3.5, mfr: 'Abbott' },
            { name: 'Risek 40mg', generic: 'Omeprazole', cat: 'Capsules', price: 20.0, cost: 14.0, mfr: 'Getz' },
            { name: 'Nexum 40mg', generic: 'Esomeprazole', cat: 'Capsules', price: 22.0, cost: 15.0, mfr: 'Getz' },
            { name: 'Hydryllin Syrup', generic: 'Aminophylline', cat: 'Syrups', price: 60.0, cost: 45.0, mfr: 'Searle' },
            { name: 'Acefyl Cough', generic: 'Acefylline', cat: 'Syrups', price: 55.0, cost: 40.0, mfr: 'Getz' },
            { name: 'Pyodine Solution', generic: 'Povidone Iodine', cat: 'First Aid', price: 40.0, cost: 25.0, mfr: 'Brookes' },
            { name: 'Saniplast', generic: 'Bandage', cat: 'First Aid', price: 2.0, cost: 1.0, mfr: 'EasyPlast' },
            { name: 'Crepe Bandage', generic: 'Elastic Bandage', cat: 'First Aid', price: 50.0, cost: 30.0, mfr: 'Local' },
            { name: 'Dettol Antiseptic', generic: 'Chloroxylenol', cat: 'First Aid', price: 150.0, cost: 120.0, mfr: 'Reckitt' },
            { name: 'Nivea Soft', generic: 'Moisturizer', cat: 'Skin Care', price: 300.0, cost: 220.0, mfr: 'Nivea' }
        ];

        const products = [];
        const stockEntries = [];

        for (const p of baseProducts) {
            // Generate Random Stock Data
            const totalStock = Math.floor(Math.random() * 200) + 10;
            const reorderLevel = Math.floor(totalStock * 0.2);

            const product = await Product.create({
                name: p.name,
                genericName: p.generic,
                sku: p.name.substring(0, 3).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900),
                category: catMap[p.cat] || catMap['Tablets'],
                costPrice: p.cost,
                sellingPrice: p.price,
                stock: totalStock, // Initial total
                reorderLevel: reorderLevel,
                manufacturer: p.mfr,
                requiresPrescription: p.cat === 'Antibiotics' || p.cat === 'Injections',
                trackStock: true,
                isActive: true
            });
            products.push(product);

            // Create 1-3 stock batches for this product
            let currentStock = 0;
            const numBatches = Math.floor(Math.random() * 3) + 1;

            for (let i = 0; i < numBatches; i++) {
                const batchQty = i === numBatches - 1 ? totalStock - currentStock : Math.floor(totalStock / numBatches);
                currentStock += batchQty;

                // Random Expiry (some soon, some far)
                const expiryDate = new Date();
                const monthsToAdd = Math.random() > 0.1 ? Math.floor(Math.random() * 24) + 1 : Math.floor(Math.random() * 3); // 10% chance expiring soon
                expiryDate.setMonth(expiryDate.getMonth() + monthsToAdd);

                stockEntries.push({
                    product: product._id,
                    supplier: suppliers[Math.floor(Math.random() * suppliers.length)]._id,
                    quantity: batchQty,
                    batchNumber: `BN-${Math.floor(10000 + Math.random() * 90000)}`,
                    costPrice: p.cost,
                    sellingPrice: p.price,
                    manufactureDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
                    expiryDate: expiryDate,
                    location: `Rack ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}-${Math.floor(Math.random() * 5) + 1}`
                });
            }
        }
        await Stock.insertMany(stockEntries);


        // --- CUSTOMERS ---
        console.log('Seeding Customers...');
        const customerNames = [
            'John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis', 'Chris Brown',
            'Patricia Taylor', 'Robert Anderson', 'Jennifer Thomas', 'David Jackson', 'Linda White'
        ];
        const customersData = customerNames.map((name, idx) => ({
            name: name,
            phone: `0300-${1000000 + idx}`,
            email: `${name.split(' ')[0].toLowerCase() + idx}@example.com`,
            address: `${10 + idx} Main St, City`,
            points: Math.floor(Math.random() * 50)
        }));
        // Add Walk-in
        customersData.unshift({ name: 'Walk-in Customer', phone: '0000000000', email: '', address: '' });

        const customers = await Customer.insertMany(customersData);


        // --- SALES (HISTORICAL) ---
        console.log('Seeding Historical Sales...');
        const salesData = [];
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 60); // Last 60 days

        // Generate ~200 sales
        for (let i = 0; i < 200; i++) {
            // Random date between start and end
            const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

            const numItems = Math.floor(Math.random() * 5) + 1;
            const items = [];
            let subtotal = 0;

            for (let j = 0; j < numItems; j++) {
                const prod = products[Math.floor(Math.random() * products.length)];
                const qty = Math.floor(Math.random() * 3) + 1;
                const lineTotal = prod.sellingPrice * qty;
                subtotal += lineTotal;

                items.push({
                    product: prod._id,
                    productName: prod.name, // Usually populated but safe to add
                    quantity: qty,
                    unitPrice: prod.sellingPrice,
                    totalPrice: lineTotal
                });
            }

            const customer = Math.random() > 0.3 ? customers[Math.floor(Math.random() * customers.length)] : null;

            // 10% chance of tax
            const tax = Math.random() > 0.9 ? subtotal * 0.1 : 0;
            const total = subtotal + tax;

            salesData.push({
                saleId: `SALE-${100000 + i}`,
                customer: customer ? customer._id : null,
                user: i % 3 === 0 ? admin._id : cashier?._id || admin._id,
                items: items,
                subtotal: subtotal,
                tax: tax,
                discount: 0,
                total: total,
                paymentMethod: i % 2 === 0 ? 'Cash' : 'Card',
                status: 'completed',
                createdAt: date,
                updatedAt: date
            });
        }
        await Sale.insertMany(salesData);

        console.log('Database seeded successfully with rich data!');
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        process.exit(0);

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedData();
}

module.exports = seedData;
