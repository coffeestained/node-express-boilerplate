// Application Imports
import mongoose from '#common/mongoose.js'; // Mongoose Manager
import { sleep } from '#common/util.js';

// Models
import Configurations from '#models/site/Configurations.js';
console.log(Configurations)

// Test Data Function
async function loadTestData() {

    await sleep(5000);

    // Connect to Mongo(ose) DB!
    mongoose();

    // Load Test Configurations
    for (let i = 0; i < 100; i++) {
        await Configurations.create({
            // Web Application's Primary Key
            domain: `${i}`,

            // In the case that no domain is found,
            // NOTE: Schema/Collection enforces
            //       only one true.
            default: (i % 2 === 1),

            // Configuration Identifying Fields
            managerIdentityUUID: `${i}`,
            title: `${i}`,
            description: `${i}`,
        })
    }

    process.exit();
}

await loadTestData();
