        // --- FIREBASE CONFIGURATION ---
        const firebaseConfig = {
            apiKey: "AIzaSyB7pFoM2AeEJnWo9SVQ594P5pt9tuXRGg4",
            authDomain: "oudelle.firebaseapp.com",
            databaseURL: "https://oudelle-default-rtdb.firebaseio.com",
            projectId: "oudelle",
            storageBucket: "oudelle.firebasestorage.app",
            messagingSenderId: "44390123746",
            appId: "1:44390123746:web:4932a37011924d5bce36bb",
            measurementId: "G-R3LS4MJNSY"
        };

        let db, auth;
        let isCloudActive = false;

        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            auth = firebase.auth();
            isCloudActive = true;
            console.log("ًں”¥ Firebase initialized successfully!");
            console.log("ًں“± Project ID:", firebaseConfig.projectId);

            // Test Firestore connection
            db.collection('app').doc('data').get().then((doc) => {
                console.log("âœ… Firestore connection test passed!");
                if (doc.exists) {
                    console.log("ًں“¦ Data found in cloud");
                } else {
                    console.log("âڑ ï¸ڈ No data in cloud yet - will create on first save");
                }
            }).catch((err) => {
                console.error("â‌Œ Firestore connection failed:", err.message);
                console.log("ًں’، Fix: Go to Firebase Console â†’ Firestore Database â†’ Create database â†’ Start in test mode");
            });
        } catch (e) {
            console.error("Firebase Init Error:", e);
            isCloudActive = false;
        }

        // Force Cloud Mode - Always use Firebase
        if (!isCloudActive) {
            console.log("âڑ ï¸ڈ Firebase not initialized - Retrying...");
            // Retry Firebase initialization
            setTimeout(() => {
                try {
                    firebase.initializeApp(firebaseConfig);
                    db = firebase.firestore();
                    auth = firebase.auth();
                    isCloudActive = true;
                    console.log("ًں”¥ Firebase initialized successfully on retry!");
                    loadDatabase();
                    ensureDefaults();
                } catch (e) {
                    console.error("â‌Œ Firebase retry failed:", e);
                    console.log("âڑ ï¸ڈ Running in Local Mode (no Firebase)");
                    isCloudActive = false;
                    loadDatabase();
                    ensureDefaults();
                }
            }, 1000);
        } else {
            console.log("âœ… Cloud Mode Active - All changes sync to Firebase");
            loadDatabase();
            ensureDefaults();
        }
        let WHATSAPP_NUM = "201023728183";
        let TICKER_TEXT = "ط¹ط±ط¶ ط®ط§طµ: ط®طµظ… 10% ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط§ظ„ط­ظ„ظˆظٹط§طھ ط§ظ„ط´ط±ظ‚ظٹط© ط¹ظ†ط¯ ط§ظ„ط·ظ„ط¨ ط¹ط¨ط± ط§ظ„ظ…ظˆظ‚ط¹! | ط§ظ„طھظˆطµظٹظ„ ظ…ط¬ط§ظ†ظٹ ظ„ظ„ط·ظ„ط¨ط§طھ ظپظˆظ‚ 500 ط¬.ظ… | ط¬ط±ط¨ ط§ظ„ظƒظ†ط§ظپط© ط§ظ„ظ†ط§ط¨ظ„ط³ظٹط© ط§ظ„ط¢ظ†!";
        let cart = JSON.parse(localStorage.getItem('oudelle_cart')) || [];
        let selectedTableNumber = null;
        let currentCat = 'oriental';
        let admCurrentCat = 'oriental';
        let isRamadanMode = localStorage.getItem('oudelle_ramadan') === 'true';

        let database = {
            uploadedImages: {
                "bosset_sadeh.jpg": "https://via.placeholder.com/300x200?text=ط¨ط³ط¨ظˆط³ظ‡+ط³ط§ط¯ظ‡",
                "bosset_meksharat.jpg": "https://via.placeholder.com/300x200?text=ط¨ط³ط¨ظˆط³ظ‡+ظ…ظƒط³ط±ط§طھ",
                "bosset_qatah.jpg": "https://via.placeholder.com/300x200?text=ط¨ط³ط¨ظˆط³ظ‡+ظ‚ط´ط·ظ‡",
                "bosset_nawela.jpg": "https://via.placeholder.com/300x200?text=ط¨ط³ط¨ظˆط³ظ‡+ظ†ظˆطھظٹظ„ط§",
                "bosset_lotes.jpg": "https://via.placeholder.com/300x200?text=ط¨ط³ط¨ظˆط³ظ‡+ظ„ظˆطھط³",
                "galash_sadeh.jpg": "https://via.placeholder.com/300x200?text=ط¬ظ„ط§ط´+ط³ط§ط¯ظ‡",
                "galash_karimeh.jpg": "https://via.placeholder.com/300x200?text=ط¬ظ„ط§ط´+ظƒط±ظٹظ…ظ‡",
                "galash_barmah_sadeh.jpg": "https://via.placeholder.com/300x200?text=ط¬ظ„ط§ط´+ط¨ط±ظ…ظ‡+ط³ط§ط¯ظ‡",
                "bolah_tarek_meksharat.jpg": "https://via.placeholder.com/300x200?text=ط¨ظ‚ظ„ط§ظˆظ‡+طھط±ظƒظٹ+ظ…ظƒط³ط±ط§طھ",
                "bolah_tarek_festq_helby.jpg": "https://via.placeholder.com/300x200?text=ط¨ظ‚ظ„ط§ظˆظ‡+طھط±ظƒظٹ+ظپط³طھظ‚+ط­ظ„ط¨ظٹ",
                "bolah_qatah.jpg": "https://via.placeholder.com/300x200?text=ط¨ظ‚ظ„ط§ظˆظ‡+ظ‚ط´ط·ظ‡",
                "shaklah_semn_baladi.jpg": "https://via.placeholder.com/300x200?text=ط´ظƒظ„ظ…ظ‡+ط³ظ…ظ†+ط¨ظ„ط¯ظٹ",
                "madla_semn_baladi.jpg": "https://via.placeholder.com/300x200?text=ظ…ط¯ظ„ط¹ظ‡+ط³ظ…ظ†+ط¨ظ„ط¯ظٹ",
                "habibah_meksharat.jpg": "https://via.placeholder.com/300x200?text=ط­ط¨ظٹط¨ظ‡+ظ…ظƒط³ط±ط§طھ",
                "ramoush_allest.jpg": "https://via.placeholder.com/300x200?text=ط±ظ…ظˆط´+ط§ظ„ط³طھ",
                "kanaf_nablusi_jbenah.jpg": "https://via.placeholder.com/300x200?text=ظƒظ†ط§ظپظ‡+ظ†ط§ط¨ظ„ط³ظٹظ‡+ط¬ط¨ظ†ظ‡"
            },
            oriental: [
                { name: "ط¨ط³ط¨ظˆط³ظ‡ ط³ط§ط¯ظ‡", price: 175, type: 'kg', img: "bosset_sadeh.jpg" },
                { name: "ط¨ط³ط¨ظˆط³ظ‡ ظ…ظƒط³ط±ط§طھ", price: 240, type: 'kg', img: "bosset_meksharat.jpg" },
                { name: "ط¨ط³ط¨ظˆط³ظ‡ ظ‚ط´ط·ظ‡", price: 220, type: 'kg', img: "bosset_qatah.jpg" },
                { name: "ط¨ط³ط¨ظˆط³ظ‡ ظ†ظˆطھظٹظ„ط§", price: 215, type: 'kg', img: "bosset_nawela.jpg" },
                { name: "ط¨ط³ط¨ظˆط³ظ‡ ظ„ظˆطھط³", price: 215, type: 'kg', img: "bosset_lotes.jpg" },
                { name: "ط¬ظ„ط§ط´ ط³ط§ط¯ظ‡", price: 170, type: 'kg', img: "galash_sadeh.jpg" },
                { name: "ط¬ظ„ط§ط´ ظƒط±ظٹظ…ظ‡", price: 200, type: 'kg', img: "galash_karimeh.jpg" },
                { name: "ط¬ظ„ط§ط´ ط¨ط±ظ…ظ‡ ط³ط§ط¯ظ‡", price: 230, type: 'kg', img: "galash_barmah_sadeh.jpg" },
                { name: "ط¨ظ‚ظ„ط§ظˆظ‡ طھط±ظƒظٹ ظ…ظƒط³ط±ط§طھ", price: 400, type: 'kg', img: "bolah_tarek_meksharat.jpg" },
                { name: "ط¨ظ‚ظ„ط§ظˆظ‡ طھط±ظƒظٹ ظپط³طھظ‚ ط­ظ„ط¨ظٹ", price: 650, type: 'kg', img: "bolah_tarek_festq_helby.jpg" },
                { name: "ط¨ظ‚ظ„ط§ظˆظ‡ ظ‚ط´ط·ظ‡", price: 650, type: 'kg', img: "bolah_qatah.jpg" },
                { name: "ط´ظƒظ„ظ…ظ‡ ط³ظ…ظ† ط¨ظ„ط¯ظٹ", price: 280, type: 'kg', img: "shaklah_semn_baladi.jpg" },
                { name: "ظ…ط¯ظ„ط¹ظ‡ ط³ظ…ظ† ط¨ظ„ط¯ظٹ", price: 220, type: 'kg', img: "madla_semn_baladi.jpg" },
                { name: "ط­ط¨ظٹط¨ظ‡ ظ…ظƒط³ط±ط§طھ", price: 220, type: 'kg', img: "habibah_meksharat.jpg" },
                { name: "ط±ظ…ظˆط´ ط§ظ„ط³طھ", price: 220, type: 'kg', img: "ramoush_allest.jpg" },
                { isMix: true, title: "ط¹ظ„ظٹ ظƒظٹظپظƒ (ط´ط±ظ‚ظٹ ظ…ط´ظƒظ„)", source: 'oriental' }
            ],
            nabulsia: [
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ط¬ط¨ظ†ظ‡ ", price: 35, type: 'piece', img: "kanaf_nablusi_jbenah.jpg" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ط¬ط¨ظ†ظ‡ (ظˆط³ط·)", price: 50, type: 'piece', img: "" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ط¬ط¨ظ†ظ‡ (ظƒط¨ظٹط±ط©)", price: 120, type: 'piece', img: "" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ط¬ط¨ظ†ظ‡ (ط¹ط§ط¦ظ„ظٹط©)", price: 200, type: 'piece', img: "" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ط¬ط¨ظ†ط© (ط¬ط§ظ…ط¨ظˆ)", price: 250, type: 'piece', img: "" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ظ‚ط´ط·ظ‡ ", price: 35, type: 'piece', img: "" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ظ‚ط´ط·ظ‡ (ظˆط³ط·)", price: 50, type: 'piece', img: "" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ظ‚ط´ط·ظ‡ (ظƒط¨ظٹط±ط©)", price: 120, type: 'piece', img: "" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ظ‚ط´ط·ظ‡ (ط¹ط§ط¦ظ„ظٹط©)", price: 200, type: 'piece', img: "" },
                { name: "ظƒظ†ط§ظپظ‡ ظ†ط§ط¨ظ„ط³ظٹظ‡ ظ‚ط´ط·ظ‡ (ط¬ط§ظ…ط¨ظˆ)", price: 250, type: 'piece', img: "" }
            ],
            dairy: [
                { name: "ط±ط² ط¨ظ„ط¨ظ† ط³ط§ط¯ظ‡", price: 25, type: 'piece', img: "" },
                { name: "ظ‚ط´ط·ظˆط·ظ‡ (ظ„ظˆطھط³/ظ†ظˆطھظٹظ„ط§/ط¨ط³طھط§ط´ظٹظˆ)", price: 75, type: 'piece', img: "" },
                { name: "طھط±ظ„طھط´ظٹ (ظƒط±ط§ظ…ظٹظ„/ط´ظˆظƒظ„طھ)", price: 75, type: 'piece', img: "" },
                { name: "ظ…ط­ظ„ط§ظٹظ‡ ط´ط§ظ…ظٹظ‡", price: 75, type: 'piece', img: "" },
                { name: "ط§ظ… ط¹ظ„ظٹ ظ…ظƒط³ط±ط§طھ", price: 75, type: 'piece', img: "" },
                { name: "ط·ط§ط¬ظ† ظ†ظˆطھظٹظ„ط§", price: 75, type: 'piece', img: "" },
                { name: "ظ…ظˆظ„طھظ† ظƒظٹظƒ", price: 55, type: 'piece', img: "" },
                { name: "ط´ظˆظƒظ„طھ ط¨ظˆظ„", price: 55, type: 'piece', img: "" }
            ],
            jordanian: [
                { name: "ط¨ط±ط§ط²ظ‚ ط³ظ…ط³ظ…", price: 30, type: 'piece', img: "" },
                { name: "ظ…ط¹ظ…ظˆظ„ ط¨ط§ظ„طھظ…ط±", price: 300, type: 'piece', img: "" },
                { name: "ط؛ط±ظٹط¨ظ‡", price: 300, type: 'piece', img: "" },
                { name: "ظ…ط¹ظ…ظˆظ„ ط³ظ…ظٹط· ط¹ظٹظ† ط¬ظ…ظ„", price: 300, type: 'piece', img: "" },
                { name: "ظ„ظٹط§ظ„ظٹ ظ„ط¨ظ†ط§ظ†", price: 175, type: 'kg', img: "" },
                { name: "ط­ط¨ظٹط¨ظ‡", price: 175, type: 'kg', img: "" },
                { name: "ظˆط±ط¨ط§طھ", price: 175, type: 'kg', img: "" },
                { name: "ظ†ظ…ظˆط±ظ‡", price: 175, type: 'kg', img: "" },
                { name: "ط¹ظٹط´ ط§ظ„ط³ط±ط§ظٹط§", price: 175, type: 'kg', img: "" },
                { name: "ط¯ط­ط¯ط­", price: 175, type: 'kg', img: "" },
                { name: "ظ‡ط±ظٹط³ظ‡", price: 175, type: 'kg', img: "" }
            ],
            Westernsweets: [
                { name: "طھظˆط±طھظ‡ ظ…ظ‚ط§ط³ 18", price: 200, type: 'piece', img: "" },
                { name: "طھظˆط±طھظ‡ ظ…ظ‚ط§ط³ 20", price: 250, type: 'piece', img: "" },
                { name: "طھظˆط±طھظ‡ ظ…ظ‚ط§ط³ 22", price: 300, type: 'piece', img: "" },
                { name: "طھظˆط±طھظ‡ ظ…ظ‚ط§ط³ 24", price: 350, type: 'piece', img: "" },
                { name: "طھظˆط±طھظ‡ ظ…ظ‚ط§ط³ 26", price: 400, type: 'piece', img: "" },
                { name: "طھظˆط±طھظ‡ ظ…ظ‚ط§ط³ 28", price: 450, type: 'piece', img: "" },
                { name: "طھط´ظٹط² ظƒظٹظƒ", price: 45, type: 'piece', img: "" },
                { name: "طھط´ظٹط² ظƒظٹظƒ ط§ط³ط¨ط§ظ†ظٹ", price: 80, type: 'piece', img: "" },
                { name: "ظپط§ط¯ط¬", price: 55, type: 'piece', img: "" },
                { name: "ظ…ظˆظ„طھظ† ظƒظٹظƒ", price: 55, type: 'piece', img: "" },
                { name: "ط¯ظˆظ†طھط³", price: 40, type: 'piece', img: "" },
                { name: "ط³ظˆظٹط³ ط±ظˆظ„", price: 100, type: 'piece', img: "" },
                { name: "ط¯ط³ط¨ط³ظٹطھظˆ ظƒط¨ظٹط±", price: 60, type: 'piece', img: "" },
                { name: "ط¯ط³ط¨ط³ظٹطھظˆ طµط؛ظٹط±", price: 40, type: 'piece', img: "" },
                { name: "ط§ظ†ط¬ظ„ط´ ظƒظٹظƒ", price: 175, type: 'piece', img: "" },
                { name: "ط¨ظپطھط±ظˆظ„", price: 75, type: 'piece', img: "" },
                { name: "ط³ظٹظ†ط¨ظˆظ†", price: 45, type: 'piece', img: "" },
                { name: "طھط§ط±طھ", price: 48, type: 'piece', img: "" },
                { name: "ط§ظƒظ„ظٹط±", price: 45, type: 'piece', img: "" },
                { name: "ط¬ط§طھظˆ ظƒظ„ط§ط³ظٹظƒ", price: 25, type: 'piece', img: "" },
            ],
            offers: [
                { name: "ط¹ط±ط¶ 1", price: 100, type: 'piece', img: "" },
                { name: "ط¹ط±ط¶ 2", price: 200, type: 'piece', img: "" },
            ],
            drinks: [
                { name: "ظ…ظٹط§ظ‡ ظ…ط¹ط¯ظ†ظٹط©", price: 10, type: 'piece', img: "" },
                { name: "ط´ط§ظٹ ظƒط§ط±ظƒ طµط؛ظٹط±", price: 15, type: 'piece', img: "" },
                { name: "ط´ط§ظٹ ظƒط§ط±ظƒ ظƒط¨ظٹط±", price: 25, type: 'piece', img: "" },
                { name: "ظ‚ظ‡ظˆط© طھط±ظƒظٹ", price: 20, type: 'piece', img: "" },
                { name: "ظ‚ظ‡ظˆظ‡ ط³ط§ط¯ظ‡", price: 20, type: 'piece', img: "" },
            ],
        };

        function loadDatabase() {
            const storedDB = JSON.parse(localStorage.getItem('oudelle_custom_database'));
            if (storedDB) {
                // Full state replacement for accurate sync (handles deletions)
                database = storedDB;
            }

            // Ensure defaults exist (in case of partial DB or new fields)
            ensureDefaults();
        }



        // Initial load
        if (isCloudActive) {
            // Cloud Mode: Listen to Firestore
            db.collection('app').doc('data').onSnapshot((doc) => {
                if (doc.exists) {
                    console.log("ًں”¥ Data received from Cloud");
                    database = doc.data();

                    // Re-apply defaults if needed
                    ensureDefaults();

                    // Full UI Sync
                    renderCategories();
                    render(currentCat);
                    renderBestSellers();
                    renderGallery();
                    syncUI();

                    // Apply Ramadan mode from cloud
                    if (database.settings && database.settings.isRamadanMode !== undefined) {
                        isRamadanMode = database.settings.isRamadanMode;
                        localStorage.setItem('oudelle_ramadan', isRamadanMode);
                        document.body.classList.toggle('ramadan-mode', isRamadanMode);
                        const btn = document.getElementById('ramadan-toggle-btn');
                        if (btn) btn.innerText = isRamadanMode ? "ط¥ط¨ط·ط§ظ„" : "طھظپط¹ظٹظ„";
                    }

                    if (document.getElementById('adminModal').style.display === 'flex') {
                        renderAdmCategoriesList();
                        renderAdmTable();
                    }
                } else {
                    // First run: Create doc if empty
                    console.log("ًں”¥ Creating initial Cloud Database...");
                    saveAdminChanges();
                }
            });
        } else {
            // Local Mode: Standard Load
            loadDatabase();
        }

        function ensureDefaults() {
            if (!database.categories) {
                database.categories = [
                    { id: 'oriental', name: 'ط§ظ„ط´ط±ظ‚ظٹ' },
                    { id: 'nabulsia', name: 'ظ‚ط³ظ… ط§ظ„ظ†ط§ط¨ظ„ط³ظٹط©' },
                    { id: 'dairy', name: 'ظ‚ط³ظ… ط§ظ„ط£ظ„ط¨ط§ظ†' },
                    { id: 'jordanian', name: 'ط§ظ„ظ‚ط³ظ… ط§ظ„ط£ط±ط¯ظ†ظٹ' },
                    { id: 'Westernsweets', name: 'ط§ظ„ط­ظ„ظˆظٹط§طھ ط§ظ„ط؛ط±ط¨ظٹط©' },
                    { id: 'offers', name: 'ط¹ط±ظˆط¶ ط®ط§طµط©' },
                    { id: 'drinks', name: 'ط§ظ„ظ…ط´ط±ظˆط¨ط§طھ' }
                ];
            }
            if (!database.stats) database.stats = { totalOrders: 0, totalRevenue: 0 };
            if (!database.gallery) database.gallery = [];
            if (!database.orders) database.orders = [];
            if (!database.settings) database.settings = { whatsapp: WHATSAPP_NUM, ticker: TICKER_TEXT };
            if (!database.vouchers) database.vouchers = { 'OUDELLE10': 0.10, 'WELCOME': 0.05, 'OFF50': 0.50, 'OUDELLE2026': 0.10 };
            if (!database.delivery) database.delivery = [
                { name: "ظ†ط¬ط¹ ط­ظ…ط§ط¯ظٹ", price: 30 },
                { name: "ط®ط§ط±ط¬ ظ†ط¬ط¹ ط­ظ…ط§ط¯ظٹ", price: 40 },
                { name: "ظ‡ظˆ", price: 50 },
                { name: "ظ…ط¯ظٹظ†ظ‡ ط§ظ„ط§ظ„ظ…ظˆظ†ظٹظˆظ…", price: 60 },
                { name: "ظ‚ط±ظٹظ‡ ط¨ط±ظƒظ‡", price: 70 }
            ];
        }

        // Cross-tab Synchronization (Local Mode Only)
        window.addEventListener('storage', (e) => {
            if (!isCloudActive && e.key === 'oudelle_custom_database') {
                console.log("ًں”„ change detected, syncing...");
                loadDatabase();

                // Re-render Client UI
                renderCategories();
                // If the current category was deleted, switch to default
                if (!database.categories.find(c => c.id === currentCat)) {
                    currentCat = database.categories[0]?.id || 'oriental';
                }
                render(currentCat);
                renderBestSellers();
                renderGallery();
                syncUI(); // Updates theme, atmosphere, etc.

                // Update Admin UI if open
                if (document.getElementById('adminModal').style.display === 'flex') {
                    renderAdmCategoriesList(); // Sync category list in admin
                    renderAdmTabs();           // Sync category tabs in admin
                    // If admCurrentCat deleted, switch
                    if (!database.categories.find(c => c.id === admCurrentCat)) {
                        admCurrentCat = database.categories[0]?.id || 'oriental';
                        renderAdmTable();
                    } else {
                        renderAdmTable();
                    }
                    renderAdmVouchers();
                    renderAdmAreas();
                    renderAdmMixEditor();
                    renderAdmOrders();
                    renderStats();
                }

                // Show notification to clients
                showUpdateNotification();
            }
        });

        // Cross-tab sync using BroadcastChannel (modern browsers)
        let broadcastChannel = null;
        if (typeof BroadcastChannel !== 'undefined') {
            broadcastChannel = new BroadcastChannel('oudelle_sync');
            broadcastChannel.onmessage = (event) => {
                if (event.data.type === 'database_update') {
                    console.log(" Received update from another tab");
                    database = event.data.data;
                };
            }

            function saveAdminChanges() {
                localStorage.setItem('oudelle_custom_database', JSON.stringify(database));

                // ZERO-TIME EXECUTION - IMMEDIATE UI update
                const startTime = performance.now();

                // SYNCHRONOUS DOM updates - ZERO WAITING
                ensureDefaults();
                renderCategories();
                render(currentCat);
                renderBestSellers();
                renderGallery();
                syncUI();
                showSyncNotification();

                // Force browser to render immediately
                if (typeof document !== 'undefined' && document.body) {
                    document.body.offsetHeight; // Force reflow
                }

                const renderTime = performance.now() - startTime;
                console.log(` UI rendered in ${renderTime.toFixed(2)}ms - ZERO-TIME EXECUTION!`);

                // Broadcast to other tabs instantly
                if (broadcastChannel) {
                    broadcastChannel.postMessage({
                        type: 'database_update',
                        data: database
                    });
                }

                // Force Internet Mode - Always use Firebase
                if (typeof firebase !== 'undefined' && !db) {
                    try {
                        db = firebase.firestore();
                        isCloudActive = true;
                        console.log("ًں”¥ Firebase re-initialized!");
                    } catch (e) {
                        console.error("â‌Œ Firebase re-init failed:", e);
                    }
                }

                // Real-time sync for all connected clients via Firebase (async)
                if (isCloudActive && db) {
                    console.log("âڑ، Syncing to cloud instantly...");
                    // Don't wait for Firebase - sync in background
                    db.collection('app').doc('data').set(database).then(() => {
                        console.log("âڑ، Changes synced to cloud instantly!");
                        // Force refresh on other devices by updating timestamp
                        const timestamp = new Date().toISOString();
                        localStorage.setItem('oudelle_last_sync', timestamp);
                    }).catch((error) => {
                        console.error(" Cloud sync error:", error);
                        // Retry immediately without blocking
                        if (db) {
                            db.collection('app').doc('data').set(database).then(() => {
                                console.log("âڑ، Retry sync successful!");
                            });
                        }
                    });
                } else {
                    console.log("âڑ ï¸ڈ Firebase not available - forcing reconnection...");
                    // Force Firebase initialization without blocking
                    setTimeout(() => {
                        try {
                            if (typeof firebase !== 'undefined') {
                                db = firebase.firestore();
                                isCloudActive = true;
                            }
                        } catch (e) {
                            console.error("â‌Œ Force reconnection failed:", e);
                        }
                    }, 0);
                }
            }

            function searchProducts(q) {
                if (!q) return render(currentCat);
                let html = "";
                let found = false;
                const uploadedImages = database.uploadedImages || {};

                for (let cat in database) {
                    if (cat === 'categories' || cat === 'stats' || cat === 'gallery' || cat === 'orders' || cat === 'settings' || cat === 'vouchers' || cat === 'delivery') continue;
                    database[cat].forEach((p, i) => {
                        const isSoldOut = p.inStock === false;
                        const hasDiscount = p.isDiscount || (p.oldPrice && parseFloat(p.oldPrice) > parseFloat(p.price));
                        const discountHTML = hasDiscount ? `<div class="discount-status-badge">ط¹ط±ط¶ ط®ط§طµ / ط®طµظ… </div>` : "";
                        if (p.name.toLowerCase().includes(q.toLowerCase())) {
                            found = true;
                            html += `
                            <div class="product-card">
                                <div class="product-image">
                                    <img src="${uploadedImages[p.img] || p.img}" alt="${p.name}">
                                </div>
                                <div class="product-info">
                                    <h3>${p.name}</h3>
                                    <p>${p.price} ${p.type}</p>
                                    ${discountHTML}
                                    ${isSoldOut ? '<div class="sold-out-badge">ظ†ظپط°</div>' : ''}
                                </div>
                                <div class="product-actions">
                                    <button class="add-to-cart" onclick="addToCart('${cat}', ${i})">ط£ط¶ظپ ط¥ظ„ظ‰ ط§ظ„ط³ظ„ط©</button>
                                </div>
                            </div>
                        `;
                        }
                    });
                }

                if (!found) {
                    html = '<h2>ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ظ†طھط§ط¦ط¬</h2>';
                }

                document.getElementById('products-container').innerHTML = html;
            }

            // WebSocket-like instant sync - multiple parallel checks
            const instantSync = () => {
                if (isCloudActive && db) {
                    // Parallel Firebase requests for maximum speed
                    Promise.all([
                        db.collection('app').doc('data').get(),
                        db.collection('app').doc('data').get(),
                        db.collection('app').doc('data').get()
                    ]).then(([doc1, doc2, doc3]) => {
                        const doc = doc1; // Use first result
                        if (doc.exists) {
                            const newData = doc.data();
                            if (JSON.stringify(newData) !== JSON.stringify(database)) {
                                console.log("âڑ، Instant sync: Update detected");
                                database = newData;
                                // Force complete UI refresh instantly
                                ensureDefaults();
                                renderCategories();
                                render(currentCat);
                                renderBestSellers();
                                renderGallery();

                                // Apply Ramadan mode from cloud immediately
                                if (database.settings && database.settings.isRamadanMode !== undefined) {
                                    isRamadanMode = database.settings.isRamadanMode;
                                    localStorage.setItem('oudelle_ramadan', isRamadanMode);
                                    document.body.classList.toggle('ramadan-mode', isRamadanMode);
                                    const btn = document.getElementById('ramadan-toggle-btn');
                                    if (btn) btn.innerText = isRamadanMode ? "ط¥ط¨ط·ط§ظ„" : "طھظپط¹ظٹظ„";
                                }

                                // Apply home background from cloud immediately
                                if (database.settings && database.settings.homeBackground) {
                                    const sliderBg = document.getElementById('slider-bg');
                                    sliderBg.style.background = `url(${database.settings.homeBackground}) center center / cover no-repeat`;
                                }

                                syncUI();

                                // Show sync notification to users
                                showSyncNotification();
                                console.log("âڑ، UI updated from cloud instantly!");
                            }
                        }
                    }).catch((error) => {
                        console.error("Sync error:", error);
                        // Retry Firebase connection immediately
                        if (db) {
                            db.collection('app').doc('data').get().then(() => {
                                console.log("âڑ، Retry sync successful!");
                            });
                        }
                    });
                } else {
                    // Force Firebase reconnection immediately
                    if (typeof firebase !== 'undefined') {
                        try {
                            db = firebase.firestore();
                            isCloudActive = true;
                            console.log("ًں”¥ Firebase reconnected instantly!");
                        } catch (e) {
                            console.error("â‌Œ Reconnection failed:", e);
                        }
                    }
                }
            };

            // Run instant sync continuously
            instantSync();
            setInterval(instantSync, 0);

            // Also run on every animation frame for maximum responsiveness
            const animationFrameSync = () => {
                instantSync();
                requestAnimationFrame(animationFrameSync);
            };
            requestAnimationFrame(animationFrameSync);

            // Auto refresh notification for users
            function showSyncNotification() {
                // Create notification element
                const notification = document.createElement('div');
                notification.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 15px 25px;
                border-radius: 50px;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
                animation: slideDown 0.5s ease;
                font-size: 1rem;
            `;
                notification.innerHTML = 'ًں”„ طھظ… طھط­ط¯ظٹط« ط§ظ„ظ‚ط§ط¦ظ…ط© طھظ„ظ‚ط§ط¦ظٹط§ظ‹!';

                document.body.appendChild(notification);

                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.style.animation = 'slideUp 0.5s ease';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 500);
                }, 3000);
            }

            function openAdmin() {
                // Remove existing login modal if any
                const existingModal = document.querySelector('.admin-login-overlay');
                if (existingModal) existingModal.remove();

                // Create custom login modal
                const loginModal = document.createElement('div');
                loginModal.className = 'admin-login-overlay';
                loginModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                direction: rtl;
            `;

                loginModal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); max-width: 400px; width: 90%;">
                    <h2 style="text-align: center; margin-bottom: 20px; color: var(--primary);">ًںژ›ï¸ڈ طھط³ط¬ظٹظ„ ط¯ط®ظˆظ„ ط§ظ„ط¥ط¯ظ…ظ†</h2>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">ظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط±:</label>
                        <input type="password" id="admin-pass-input" style="width: 100%; padding: 12px; border: 2px solid var(--gold); border-radius: 8px; font-size: 16px; text-align: center;" placeholder="ط£ط¯ط®ظ„ ظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط±" autofocus>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="confirmAdminLogin()" style="flex: 1; background: var(--primary); color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;">ط¯ط®ظˆظ„</button>
                        <button onclick="cancelAdminLogin()" style="flex: 1; background: #dc3545; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 16px;">ط¥ظ„ط؛ط§ط،</button>
                    </div>
                </div>
            `;

                document.body.appendChild(loginModal);

                // Focus on password input
                setTimeout(() => {
                    const passInput = document.getElementById('admin-pass-input');
                    if (passInput) {
                        passInput.focus();
                        // Allow Enter key to submit
                        passInput.addEventListener('keypress', function (e) {
                            if (e.key === 'Enter') {
                                confirmAdminLogin();
                            }
                        });
                    }
                }, 100);
            }

            function confirmAdminLogin() {
                const passInput = document.getElementById('admin-pass-input');
                const password = passInput ? passInput.value : '';

                if (password === "55555") {
                    document.querySelector('.admin-login-overlay').remove();
                    showAdminPanel();
                    alert("âœ… طھظ… طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„ ط¨ظ†ط¬ط§ط­!");
                } else {
                    passInput.style.borderColor = '#dc3545';
                    passInput.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        passInput.style.borderColor = 'var(--gold)';
                        passInput.style.animation = '';
                    }, 500);
                }
            }

            function cancelAdminLogin() {
                const loginModal = document.querySelector('.admin-login-overlay');
                if (loginModal) {
                    loginModal.remove();
                }
            }

            function showAdminPanel() {
                document.getElementById('adminModal').style.display = 'flex';
                renderAdmTabs();
                renderAdmTable();
                renderAdmGallery();
                renderAdmVouchers();
                renderAdmAreas();
                renderStats();
                renderAdmOrders();
                renderAdmMixEditor();
                if (database.settings) {
                    document.getElementById('adm-wa-num').value = database.settings.whatsapp;
                    document.getElementById('adm-ticker-text').value = database.settings.ticker;
                }
                document.getElementById('ramadan-toggle-btn').innerText = isRamadanMode ? "ط¥ط¨ط·ط§ظ„" : "طھظپط¹ظٹظ„";
            }

            function resetRevenue() {
                if (confirm("âڑ ï¸ڈ طھط­ط°ظٹط±: ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† طھطµظپظٹط± ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¨ظٹط¹ط§طھطں ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط، ظ„ط§ ظٹظ…ظƒظ† ط§ظ„طھط±ط§ط¬ط¹ ط¹ظ†ظ‡!")) {
                    database.stats.totalRevenue = 0;
                    saveAdminChanges();
                    renderStats();
                    alert("âœ… طھظ… طھطµظپظٹط± ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¨ظٹط¹ط§طھ ط¨ظ†ط¬ط§ط­!");
                }
            }

            function resetTotalOrders() {
                if (confirm("âڑ ï¸ڈ طھط­ط°ظٹط±: ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† طھطµظپظٹط± ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط·ط§ظ„ط¨ط§طھطں ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط، ظ„ط§ ظٹظ…ظƒظ† ط§ظ„طھط±ط§ط¬ط¹ ط¹ظ†ظ‡!")) {
                    database.orders = [];
                    database.stats.totalOrders = 0;
                    localStorage.setItem('oudelle_order_counter', 0);
                    saveAdminChanges();
                    renderStats();
                    renderAdmOrders();
                    alert("âœ… طھظ… طھطµظپظٹط± ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط·ط§ظ„ط¨ط§طھ ط¨ظ†ط¬ط§ط­!");
                }
            }

            function clearAllOrders() {
                if (confirm("âڑ ï¸ڈ طھط­ط°ظٹط±: ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ظ…ط³ط­ ظƒظ„ ط§ظ„ط£ظˆط±ط¯ط±ط§طھطں ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط، ظ„ط§ ظٹظ…ظƒظ† ط§ظ„طھط±ط§ط¬ط¹ ط¹ظ†ظ‡!")) {
                    database.orders = [];
                    saveAdminChanges();
                    renderAdmOrders();
                    alert("âœ… طھظ… ظ…ط³ط­ ط¬ظ…ظٹط¹ ط§ظ„ط£ظˆط±ط¯ط±ط§طھ ط¨ظ†ط¬ط§ط­!");
                }
            }

            function renderAdmTabs() {
                const tabsDiv = document.getElementById('adm-category-tabs');
                if (tabsDiv && database.categories) {
                    tabsDiv.innerHTML = database.categories.map(c => `
                    <button class="admin-tab-btn ${c.id === admCurrentCat ? 'active' : ''}" 
                            onclick="switchAdmCat('${c.id}')">
                        ${c.name}
                    </button>
                `).join('');
                }
            }

            function switchAdmCat(cat) {
                admCurrentCat = cat;
                renderAdmTabs();

                renderAdmTable();
                render(cat);
            }

            function syncUI() {
                // Update Global Settings
                if (database.settings) {
                    WHATSAPP_NUM = database.settings.whatsapp;
                    TICKER_TEXT = database.settings.ticker;
                    const tickerEl = document.querySelector('.ticker');
                    if (tickerEl) tickerEl.innerText = TICKER_TEXT;
                }

                // Render Client Views (ensure immediate local update)
                renderCategories();
                render(currentCat);
                renderBestSellers();
                const sky = document.getElementById('sky-overlay');
                if (sky && sky.children.length === 0) {
                    for (let i = 0; i < 80; i++) {
                        const star = document.createElement('div');
                        star.className = 'star';
                        star.style.left = Math.random() * 100 + '%';
                        star.style.top = Math.random() * 100 + '%';
                        const size = Math.random() * 2 + 1;
                        star.style.width = size + 'px';
                        star.style.height = size + 'px';
                        star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite alternate`;
                        sky.appendChild(star);
                    }
                }
                updateAtmosphere();
                if (!window.ramadanInterval) {
                    window.ramadanInterval = setInterval(updateAtmosphere, 1000);
                }
            }

            function updateAtmosphere() {
                if (!isRamadanMode) {
                    if (window.ramadanInterval) {
                        clearInterval(window.ramadanInterval);
                        window.ramadanInterval = null;
                    }
                    return;
                }
                const now = new Date();
                const maghrib = new Date();
                maghrib.setHours(18, 15, 0); // Estimated Iftar for Naga Hammadi
                const diff = maghrib - now;
                const timer = document.getElementById('iftar-countdown');
                const stars = document.querySelectorAll('.star');
                const compass = document.getElementById('ramadan-compass');

                if (diff > 0) {
                    const hours = Math.floor(diff / 3600000);
                    const mins = Math.floor((diff % 3600000) / 60000);
                    const secs = Math.floor((diff % 60000) / 1000);
                    timer.innerHTML = `${hours}h ${mins}m<br>ط¹ظ„ظ‰ ط§ظ„ظ…ط؛ط±ط¨`;
                    const twoHours = 2 * 60 * 60 * 1000;
                    if (diff < twoHours) {
                        const progress = 1 - (diff / twoHours);
                        if (progress > 0.5) document.body.classList.add('night-time');
                        stars.forEach(s => s.style.opacity = progress.toFixed(2));
                    }
                } else {
                    timer.innerHTML = "طµظˆظ…ط§ظ‹ ظ…ظ‚ط¨ظˆظ„ط§ظ‹<br>ظˆط¥ظپط·ط§ط±ط§ظ‹ ط´ظ‡ظٹط§ظ‹";
                    document.body.classList.add('night-time');
                    stars.forEach(s => s.style.opacity = '1');
                    if (compass) compass.style.borderColor = "#4ade80";
                }
            }

            function showIftarInfo() {
                alert("ط¨ظˆطµظ„ط© ط£ظˆط¯ظٹظ„ ط§ظ„ط±ظ…ط¶ط§ظ†ظٹط© âœ¨\nطھظ‚ظˆظ… ط¨ط­ط³ط§ط¨ ظ…ظˆط¹ط¯ ط§ظ„ط¥ظپط·ط§ط± ظپظٹ ظ†ط¬ط¹ ط­ظ…ط§ط¯ظٹ ظˆطھظ†ط¨ظٹظ‡ظƒ ط¨ط§ظ‚طھط±ط§ط¨ ظˆظ‚طھ ط§ظ„ظ…ط؛ط±ط¨!");
            }

            // --- Advanced Engagement Features Logic ---
            let appliedDiscount = 0;
            const validVouchers = { 'OUDELLE10': 0.10, 'WELCOME': 0.05, 'OFF50': 0.50, 'OUDELLE2026': 0.10 };

            function surpriseMe() {
                const allProducts = [];
                for (let cat in database) {
                    if (database[cat]) {
                        database[cat].forEach(p => { if (!p.isMix && p.inStock !== false) allProducts.push({ ...p, cat }); });
                    }
                }
                if (allProducts.length === 0) return;
                const randomP = allProducts[Math.floor(Math.random() * allProducts.length)];

                // Highlight the product
                showMenu();
                render(randomP.cat);
                alert(`âœ¨ ط¬ط±ط¨ظ†ط§ ظ†ط®طھط§ط±ظ„ظƒ: ${randomP.name}! âœ¨\nط¥ظٹظ‡ ط±ط£ظٹظƒطں`);

                // Scroll to it
                setTimeout(() => {
                    const cards = document.querySelectorAll('.card');
                    cards.forEach(c => {
                        if (c.innerText.includes(randomP.name)) {
                            c.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            c.style.boxShadow = "0 0 30px var(--gold)";
                            setTimeout(() => c.style.boxShadow = "var(--shadow)", 3000);
                        }
                    });
                }, 500);
            }

            function applyVoucher() {
                const code = document.getElementById('v-code').value.toUpperCase();
                const msg = document.getElementById('v-msg');
                const vouchers = database.vouchers || {};
                if (vouchers[code]) {
                    appliedDiscount = vouchers[code];
                    msg.innerText = `âœ… طھظ… طھط·ط¨ظٹظ‚ ط®طµظ… ${(appliedDiscount * 100)}%`;
                    msg.style.color = "green";
                    updateTotal();
                } else {
                    appliedDiscount = 0;
                    msg.innerText = "â‌Œ ظƒظˆط¯ ط؛ظٹط± طµط­ظٹط­";
                    msg.style.color = "red";
                    updateTotal();
                }
            }

            function callWaiter() {
                if (!selectedTableNumber) return alert("ظٹط±ط¬ظ‰ ط§ط®طھظٹط§ط± ط±ظ‚ظ… ط§ظ„ط·ط§ظˆظ„ط© ط£ظˆظ„ط§ظ‹");
                const text = `ًں”” *ط·ظ„ط¨ ظ…ط³ط§ط¹ط¯ط©*\\n*ط·ط§ظˆظ„ط© ط±ظ‚ظ…:* ${selectedTableNumber}\\nط§ظ„ط¹ظ…ظٹظ„ ظٹط·ظ„ط¨ ط§ظ„ط¬ط±ط³ظˆظ†.`;
                window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(text)}`);
            }


            function render(cat, btn) {
                currentCat = cat;
                document.querySelectorAll('.tab').forEach(t => {
                    t.classList.remove('active');
                    if (t.getAttribute('onclick')?.includes(`'${cat}'`)) t.classList.add('active');
                });

                let html = "";
                let itemsWithIndex = database[cat]
                    .map((p, index) => ({ ...p, index }))
                    .sort((a, b) => (a.isMix === b.isMix ? 0 : a.isMix ? 1 : -1));

                if (itemsWithIndex.length === 0) {
                    document.getElementById('product-grid').innerHTML = "<p style='text-align:center; width:100%; padding:20px;'>ظ„ط§ طھظˆط¬ط¯ ط£طµظ†ط§ظپ ط­ط§ظ„ظٹط§ظ‹ ظپظٹ ظ‡ط°ط§ ط§ظ„ظ‚ط³ظ…</p>";
                    return;
                }

                const uploadedImages = database.uploadedImages || {};
                itemsWithIndex.forEach((p) => {
                    const i = p.index;
                    const isSoldOut = p.inStock === false;
                    const isVIP = p.isVIP || false;
                    const hasDiscount = p.isDiscount || (p.oldPrice && parseFloat(p.oldPrice) > parseFloat(p.price));
                    const discountHTML = hasDiscount ? `<div class="discount-status-badge">ط¹ط±ط¶ ط®ط§طµ / ط®طµظ… ًںڈ·ï¸ڈ</div>` : "";

                    // Check if image exists in uploaded images or use placeholder
                    let img = p.img || `https://via.placeholder.com/300x200?text=${p.name}`;
                    if (p.img && uploadedImages[p.img]) {
                        img = uploadedImages[p.img];
                    }

                    const vipHTML = isVIP ? `<div class="vip-badge">ط§ظ„ط´ظٹظپ ظٹط±ط´ط­ظ‡ ًں‘‘</div>` : "";


                    if (p.isMix) {
                        const sourceItems = p.contents ? p.contents.map(name => {
                            for (let c in database) {
                                let found = database[c].find(x => x.name === name);
                                if (found) return found;
                            }
                            return null;
                        }).filter(x => x) : database[p.source].filter(x => !x.isMix);

                        html += `<div class="card ${isSoldOut ? 'sold-out' : ''}" style="grid-column: 1/-1; background: var(--primary); color: white; position:relative;">${discountHTML}${vipHTML}<h3 style="color: white;">${p.title}</h3>` +
                            sourceItems.map(sub => `<div style="display:flex; justify-content:space-between; padding:5px; color: white;">${sub.name}<input type="number" class="mix-sub" data-name="${sub.name}" data-price="${sub.price}" style="width:60px" placeholder="ط¬ظ…"></div>`).join('') + `<button class="hero-btn" style="box-shadow:none; margin-top:10px; font-size:1rem; color: white; border: 1px solid white;" onclick="addMix('${p.title}')" ${isSoldOut ? 'disabled' : ''}>${isSoldOut ? 'ط؛ظٹط± ظ…طھظˆظپط± ط­ط§ظ„ظٹط§ظ‹' : 'ط¥ط¶ط§ظپط©'}</button></div>`;
                    } else {
                        const optionsHTML = (p.options && p.options.length)
                            ? `<select id="o-${cat}-${i}" class="weight-select" ${isSoldOut ? 'disabled' : ''}>${p.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`
                            : "";

                        if (p.type === 'kg') {
                            let displayPrice = (p.price / 4).toFixed(2);
                            let oldDisplayPrice = p.oldPrice ? (p.oldPrice / 4).toFixed(2) : null;
                            const oldPriceHTML = oldDisplayPrice ? `<div class="old-price-display"><span class="price-strike-small">${oldDisplayPrice} ط¬</span></div>` : "";
                            let unit = 'ط¬/ط±ط¨ط¹ ظƒظٹظ„ظˆ';
                            let weightOptions = `<option value="0.25">250ط¬ظ…</option><option value="0.5">500ط¬ظ…</option><option value="0.75">750ط¬ظ…</option><option value="1" selected>1 ظƒظٹظ„ظˆ</option>`;
                            html += `<div class="card ${isSoldOut ? 'sold-out' : ''}" style="position:relative;">${vipHTML}<img src="${img}"><h3>${p.name}</h3>` +
                                (isSoldOut ? `<span class="out-of-stock-badge">ط؛ظٹط± ظ…طھظˆظپط± ط­ط§ظ„ظٹط§ظ‹</span>` : `${discountHTML}${oldPriceHTML}<span class="price-badge">${displayPrice} ${unit}</span>`) +
                                `${optionsHTML}<select id="w-${cat}-${i}" class="weight-select" ${isSoldOut ? 'disabled' : ''}>${weightOptions}</select><button class="add-btn" onclick="addKg('${cat}',${i})" ${isSoldOut ? 'disabled' : ''}>${isSoldOut ? 'ط؛ظٹط± ظ…طھظˆظپط±' : 'ط¥ط¶ط§ظپط©'}</button></div>`;
                        } else {
                            const oldPriceHTML = p.oldPrice ? `<div class="old-price-display"><span class="price-strike-small">${p.oldPrice} ط¬</span></div>` : "";
                            html += `<div class="card ${isSoldOut ? 'sold-out' : ''}" style="position:relative;">${vipHTML}<img src="${img}"><h3>${p.name}</h3>` +
                                (isSoldOut ? `<span class="out-of-stock-badge">ط؛ظٹط± ظ…طھظˆظپط± ط­ط§ظ„ظٹط§ظ‹</span>` : `${discountHTML}${oldPriceHTML}<span class="price-badge">${p.price} ط¬.ظ…</span>`) +
                                `${optionsHTML}<input type="number" id="q-${cat}-${i}" class="weight-select" value="1" min="1" ${isSoldOut ? 'disabled' : ''}><button class="add-btn" onclick="addPiece('${cat}',${i})" ${isSoldOut ? 'disabled' : ''}>${isSoldOut ? 'ط؛ظٹط± ظ…طھظˆظپط±' : 'ط¥ط¶ط§ظپط©'}</button></div>`;
                        }
                    }
                });
                document.getElementById('product-grid').innerHTML = html;
            }


            // --- Cart Functions ---
            function addToCart(cat, index) {
                // Default behavior for manual add button (mostly for search results)
                // For specific types, use addPiece or addKg
                const p = database[cat][index];
                if (!p) return;

                // If it has options or is kg, try to find the specific selectors
                if (p.type === 'kg') {
                    addKg(cat, index);
                } else {
                    addPiece(cat, index);
                }
            }

            function addPiece(cat, index) {
                const p = database[cat][index];
                const qInput = document.getElementById(`q-${cat}-${index}`);
                const quantity = qInput ? parseInt(qInput.value) : 1;
                const optionSelect = document.getElementById(`o-${cat}-${index}`);
                const option = optionSelect ? optionSelect.value : null;

                if (quantity < 1) return alert("ط§ظ„ظƒظ…ظٹط© ظٹط¬ط¨ ط£ظ† طھظƒظˆظ† 1 ط¹ظ„ظ‰ ط§ظ„ط£ظ‚ظ„");

                const item = {
                    name: p.name + (option ? ` (${option})` : ""),
                    price: parseFloat(p.price) * quantity,
                    quantity: quantity,
                    type: 'piece',
                    unitPrice: p.price
                };

                cart.push(item);
                updateCartCount();
                saveCart();
                showToast(`طھظ… ط¥ط¶ط§ظپط© ${quantity} ${p.name} ظ„ظ„ط³ظ„ط© ًں›’`);
            }

            function addKg(cat, index) {
                const p = database[cat][index];
                const wSelect = document.getElementById(`w-${cat}-${index}`);
                const weight = parseFloat(wSelect.value);
                const optionSelect = document.getElementById(`o-${cat}-${index}`);
                const option = optionSelect ? optionSelect.value : null;

                const price = parseFloat(p.price) * weight;
                let weightLabel = "";
                if (weight === 0.25) weightLabel = "ط±ط¨ط¹ ظƒظٹظ„ظˆ";
                else if (weight === 0.5) weightLabel = "ظ†طµظپ ظƒظٹظ„ظˆ";
                else if (weight === 0.75) weightLabel = "ظƒظٹظ„ظˆ ط¥ظ„ط§ ط±ط¨ط¹";
                else if (weight === 1) weightLabel = "ظƒظٹظ„ظˆ";
                else weightLabel = weight + " ظƒظٹظ„ظˆ";

                const item = {
                    name: p.name + ` (${weightLabel})` + (option ? ` - ${option}` : ""),
                    price: price,
                    quantity: 1,
                    weight: weight,
                    type: 'kg',
                    unitPrice: p.price
                };

                cart.push(item);
                updateCartCount();
                saveCart();
                showToast(`طھظ… ط¥ط¶ط§ظپط© ${p.name} ظ„ظ„ط³ظ„ط© ًں›’`);
            }

            function addMix(title) {
                // Logic for adding a mix box would go here if implemented
                // For now, prompt user or add fixed item
                const item = {
                    name: title,
                    price: 0, // Calculated later or fixed? Assuming mix usually has set price or sum
                    quantity: 1,
                    type: 'mix',
                    isMix: true
                };
                // Alert user that mix builder isn't fully active in this snippet or add partial logic
                alert("ط³ظٹطھظ… ط¥ط¶ط§ظپط© ظ…ظٹط²ط© طھط¬ظ…ظٹط¹ ط§ظ„ط¨ظˆظƒط³ ظ‚ط±ظٹط¨ط§ظ‹! ظٹظ…ظƒظ†ظƒ ط§ظ„ط·ظ„ط¨ ط¹ط¨ط± ط§ظ„ظˆط§طھط³ط§ط¨ ظ…ط¨ط§ط´ط±ط©.");
            }

            function removeFromCart(index) {
                cart.splice(index, 1);
                updateCartCount();
                saveCart();
                renderCart();
            }

            function updateCartCount() {
                document.getElementById('cart-count').innerText = cart.length;
            }

            function saveCart() {
                localStorage.setItem('oudelle_cart', JSON.stringify(cart));
            }

            function renderCart() {
                const list = document.getElementById('cart-list');
                if (cart.length === 0) {
                    list.innerHTML = "<p style='text-align:center;'>ط§ظ„ط³ظ„ط© ظپط§ط±ط؛ط© ًں›’</p>";
                    document.getElementById('total-price').innerText = "";
                    return;
                }

                list.innerHTML = cart.map((item, i) => `
                <div style="background:#fff; padding:10px; border-radius:10px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; border:1px solid #eee;">
                    <div>
                        <b>${item.name}</b>
                        <div style="font-size:0.85rem; color:#666;">${item.price.toFixed(2)} ط¬.ظ…</div>
                    </div>
                    <button onclick="removeFromCart(${i})" style="background:red; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">ط­ط°ظپ</button>
                </div>
            `).join('');

                updateTotal();
            }

            function showCart() {
                const modal = document.getElementById('cartModal');
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                } else {
                    renderCart();
                    modal.style.display = 'flex';
                }
            }

            function showMenu() {
                document.getElementById('home-page').style.display = 'none';
                document.getElementById('menu-page').style.display = 'block';
                window.scrollTo(0, 0);
            }

            function showHome() {
                document.getElementById('menu-page').style.display = 'none';
                document.getElementById('home-page').style.display = 'flex';
            }


            function showToast(msg) {
                const toast = document.createElement('div');
                toast.innerText = msg;
                toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                z-index: 100000;
                animation: slideUp 0.3s ease;
            `;
                document.body.appendChild(toast);
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            }

            // --- Image Compression Wrapper ---
            function compressImage(file, maxWidth = 800, quality = 0.7) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (event) => {
                        const img = new Image();
                        img.src = event.target.result;
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            let width = img.width;
                            let height = img.height;

                            if (width > maxWidth) {
                                height = Math.round((height * maxWidth) / width);
                                width = maxWidth;
                            }

                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, height);

                            // Compress
                            resolve(canvas.toDataURL('image/jpeg', quality));
                        };
                        img.onerror = (error) => reject(error);
                    };
                    reader.onerror = (error) => reject(error);
                });
            }

            function checkout() {
                const name = document.getElementById('c-name').value, meth = document.getElementById('del-method').value;
                if (!name) return alert("ط§ظ„ط§ط³ظ… ظ…ط·ظ„ظˆط¨");
                if (meth !== 'dinein' && !confirm("ظ‡ظ„ ظ‚ظ…طھ ط¨ط§ظ„طھط­ظˆظٹظ„ ظˆطھطµظˆظٹط± ظ„ظ‚ط·ط© ط§ظ„ط´ط§ط´ط©طں")) return;

                let orderNum = localStorage.getItem('oudelle_order_counter') || 0;
                orderNum = parseInt(orderNum) + 1;
                localStorage.setItem('oudelle_order_counter', orderNum);

                // --- Structured WhatsApp Template ---
                let text = `ًںŒں *ط·ظ„ط¨ ط¬ط¯ظٹط¯ ظ…ظ† ط£ظˆط¯ظٹظ„* ًںŒں\n`;
                text += `------------------------------------------\n`;
                text += `ًں“¦ *ط±ظ‚ظ… ط§ظ„ط£ظˆط±ط¯ط±: #${orderNum}* ًں“¦\n`;
                text += `------------------------------------------\n\n`;

                text += `ًں‘¤ *ط¨ظٹط§ظ†ط§طھ ط§ظ„ط¹ظ…ظٹظ„:*\n`;
                text += `â€¢ ط§ظ„ط§ط³ظ…: ${name}\n`;
                if (meth !== 'dinein') {
                    text += `â€¢ ط§ظ„ظ‡ط§طھظپ: ${document.getElementById('c-phone').value}\n`;
                }
                text += `\n`;

                text += `ًں“چ *طھظپط§طµظٹظ„ ط§ظ„ط·ظ„ط¨:*\n`;
                const methAr = (meth === 'delivery') ? 'طھظˆطµظٹظ„ ظ„ظ„ظ…ظ†ط²ظ„ ًںڈ ' : (meth === 'pickup' ? 'ط§ط³طھظ„ط§ظ… ظ…ظ† ط§ظ„ظپط±ط¹ ًں¥¯' : 'ط¯ط§ط®ظ„ ط§ظ„ظ…ط·ط¹ظ… ًںچ½ï¸ڈ');
                text += `â€¢ ط§ظ„ظ†ظˆط¹: ${methAr}\n`;

                if (meth === 'dinein') {
                    text += `â€¢ ط§ظ„ط·ط§ظˆظ„ط©: ${selectedTableNumber}\n`;
                } else {
                    text += `â€¢ ط§ظ„ط¯ظپط¹: InstaPay âœ…\n`;
                    if (meth === 'delivery') {
                        text += `â€¢ ط§ظ„ط¹ظ†ظˆط§ظ†: ${document.getElementById('c-addr').value}\n`;
                    }
                }

                const ordDate = document.getElementById('order-date').value;
                const ordTime = document.getElementById('order-time').value;
                if (ordDate || ordTime) {
                    text += `â€¢ ط§ظ„ظ…ظˆط¹ط¯: ${ordDate || 'ط§ظ„ظٹظˆظ…'} ظپظٹ ${ordTime || 'ط£ظ‚ط±ط¨ ظˆظ‚طھ'}\n`;
                }
                text += `\n`;

                text += `ًں§پ *ط§ظ„ط£طµظ†ط§ظپ ط§ظ„ظ…ط·ظ„ظˆط¨ط©:*\n`;
                text += cart.map(it => `â€¢ ${it.name} â€” ${it.price.toFixed(2)} ط¬`).join('\n');
                text += `\n\n`;

                text += `ًں’° *ط§ظ„ط­ط³ط§ط¨ ط§ظ„ظ†ظ‡ط§ط¦ظٹ:*\n`;
                const subtotal = cart.reduce((s, it) => s + it.price, 0);
                text += `â€¢ ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ: ${subtotal.toFixed(2)} ط¬\n`;
                if (appliedDiscount > 0) {
                    text += `â€¢ ط§ظ„ط®طµظ…: ${(appliedDiscount * 100)}%\n`;
                }

                if (meth === 'delivery') {
                    const shipping = parseInt(document.getElementById('area-select').value);
                    text += `â€¢ ط§ظ„طھظˆطµظٹظ„: ${shipping} ط¬\n`;
                }

                text += `\nًں’µ *ط§ظ„ظ…ط·ظ„ظˆط¨ ط¯ظپط¹ظ‡: ${document.getElementById('total-price').innerText}* ًں’µ\n`;
                text += `------------------------------------------\n`;
                text += `ط´ظƒط±ط§ظ‹ ظ„ط§ط®طھظٹط§ط±ظƒظ… ط£ظˆط¯ظٹظ„! â‌¤ï¸ڈâœ¨`;

                database.stats.totalOrders++;
                database.stats.totalRevenue += subtotal;

                const orderDetails = {
                    num: orderNum,
                    name: name,
                    phone: document.getElementById('c-phone').value,
                    addr: document.getElementById('c-addr').value,
                    meth: meth,
                    table: selectedTableNumber,
                    items: JSON.parse(JSON.stringify(cart)),
                    subtotal: subtotal,
                    discount: appliedDiscount,
                    shipping: (meth === 'delivery') ? parseInt(document.getElementById('area-select').value) : 0,
                    total: parseFloat(document.getElementById('total-price').innerText.replace(/[^0-9.]/g, '')),
                    date: new Date().toLocaleString('ar-EG'),
                    scheduled: { date: document.getElementById('order-date').value, time: document.getElementById('order-time').value }
                };
                database.orders.unshift(orderDetails);
                if (database.orders.length > 50) database.orders.pop();

                saveAdminChanges();

                const waUrl = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(text)}`;
                showOrderAnimation(waUrl);

                // Show Simulation
                showCart(); // close cart
                cart = []; localStorage.removeItem('oudelle_cart'); renderCart(); // Clear cart after order
            }

            function showOrderAnimation(url) {
                const overlay = document.getElementById('order-success-overlay');
                const confettiCont = document.getElementById('confetti-container');
                overlay.style.display = 'flex';

                // Create luxurious particles (gold/white)
                confettiCont.innerHTML = '';
                for (let i = 0; i < 50; i++) {
                    const p = document.createElement('div');
                    p.style.position = 'absolute';
                    p.style.width = Math.random() * 8 + 4 + 'px';
                    p.style.height = p.style.width;
                    p.style.background = Math.random() > 0.5 ? '#fbbf24' : '#ffffff';
                    p.style.borderRadius = '50%';
                    p.style.left = Math.random() * 100 + '%';
                    p.style.top = '-10%';
                    p.style.opacity = Math.random();
                    p.style.transition = `all ${2 + Math.random() * 3}s linear`;
                    confettiCont.appendChild(p);

                    setTimeout(() => {
                        p.style.top = '110%';
                        p.style.left = (parseFloat(p.style.left) + (Math.random() * 20 - 10)) + '%';
                        p.style.transform = `rotate(${Math.random() * 360}deg)`;
                    }, 100);
                }

                // Redirect after animation stages (approx 5s)
                window.pendingWaUrl = url;
                const fallbackBtn = document.getElementById('wa-fallback-btn');

                setTimeout(() => {
                    fallbackBtn.style.display = 'inline-block';
                    window.location.href = url;
                }, 5500);

                // Hide overlay after return (or after a long timeout)
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        overlay.style.opacity = '1';
                    }, 1000);
                }, 8000);
            }

            function updateTotal() {
                const subtotal = cart.reduce((s, it) => s + it.price, 0);
                const areaSel = document.getElementById('area-select');
                let shipping = (document.getElementById('del-method').value === 'delivery' && areaSel) ? parseInt(areaSel.value) : 0;
                const total = (subtotal + shipping) * (1 - appliedDiscount);
                document.getElementById('total-price').innerText = `ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ: ${total.toFixed(2)} ط¬.ظ…`;
            }

            function toggleFields() {
                const m = document.getElementById('del-method').value;
                document.getElementById('dinein-field').classList.toggle('hidden', m !== 'dinein');
                document.getElementById('waiter-field').classList.toggle('hidden', m !== 'dinein');
                document.getElementById('delivery-field').classList.toggle('hidden', m !== 'delivery');
                document.getElementById('phone-field').classList.toggle('hidden', m === 'dinein');
                document.getElementById('instapay-ui').style.display = (m === 'dinein') ? 'none' : 'block';

                // Show scheduling button only for delivery/pickup
                const showToggle = (m === 'delivery' || m === 'pickup');
                document.getElementById('schedule-toggle-container').classList.toggle('hidden', !showToggle);

                // Auto-hide schedule fields when changing method
                document.getElementById('schedule-field').classList.add('hidden');

                updateTotal();
            }

            function toggleSchedule() {
                const field = document.getElementById('schedule-field');
                field.classList.toggle('hidden');
                if (!field.classList.contains('hidden')) {
                    field.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // --- Admin Enhancements for Advanced Features ---
            function renderAdmTable() {
                const tableBody = document.getElementById('adm-items-table');
                const items = database[admCurrentCat] || [];

                tableBody.innerHTML = items.map((p, index) => `
                <tr>
                    <td><img src="${p.img || 'https://via.placeholder.com/50'}" style="width:40px; height:40px; object-fit:cover; border-radius:5px;"></td>
                    <td>${p.isMix ? p.title : p.name}</td>
                    <td>
                        ${p.isMix ? '---' : `<input type="number" value="${p.price}" 
                                style="width:70px; padding:3px; border:1px solid #ddd; border-radius:5px;"
                                onchange="admUpdateCurrentPrice('${admCurrentCat}', ${index}, this.value)"> ط¬`}
                    </td>
                    <td>
                        ${p.isMix ? '---' : `<input type="number" value="${p.oldPrice || ''}"
                                style="width:70px; padding:3px; border:1px solid #ddd; border-radius:5px;"
                                onchange="admUpdateOldPrice('${admCurrentCat}', ${index}, this.value)"> ط¬`}
                    </td>
                    <td>${p.isMix ? 'ظ…ظƒط³' : (p.type === 'kg' ? 'ظƒظٹظ„ظˆ' : 'ظ‚ط·ط¹ط©')}</td>
                    <td>${p.isMix ? '---' : (p.options && p.options.length ? `(ظ…طھط¹ط¯ط¯)` : 'ط³ط§ط¯ظ‡')}</td>
                    <td>
                        <button class="admin-btn" style="width:auto; padding:2px 8px; background:${p.isBestSeller ? '#ff9800' : '#ccc'};"
                                onclick="admToggleBestSeller('${admCurrentCat}', ${index})">ًں”¥ ط§ظ„ط£ظƒط«ط±</button>
                        <button class="admin-btn" style="width:auto; padding:2px 8px; background:${p.isVIP ? 'gold' : '#ccc'}; margin-top:3px;"
                                onclick="admToggleVIP('${admCurrentCat}', ${index})">ًں‘‘ VIP</button>
                        <button class="admin-btn" style="width:auto; padding:2px 8px; background:${p.isDiscount ? '#d32f2f' : '#ccc'}; margin-top:3px; color:${p.isDiscount ? 'white' : 'black'};"
                                onclick="admToggleDiscount('${admCurrentCat}', ${index})">ًںڈ·ï¸ڈ ط®طµظ…</button>
                        <button class="admin-btn" style="width:auto; padding:2px 8px; background:#2196f3; margin-top:3px; color:white;"
                                onclick="admEditProduct('${admCurrentCat}', ${index})">âœڈï¸ڈ طھط¹ط¯ظٹظ„</button>
                    </td>
                    <td>
                        <button class="admin-btn" style="width:auto; padding:2px 8px; background:${p.inStock !== false ? '#4ade80' : '#ff4444'};"
                                onclick="admToggleStock('${admCurrentCat}', ${index})">
                            ${p.inStock !== false ? 'ظ…طھظˆظپط±' : 'ظ…ظ†طھظ‡ظٹ'}
                        </button>
                    </td>
                    <td>
                        <button class="admin-btn" style="width:auto; padding:2px 8px; background:#ef4444;" 
                                onclick="admDeleteProduct('${admCurrentCat}', ${index})">ط­ط°ظپ</button>
                    </td>
                </tr>
            `).join('');
            }

            function admToggleVIP(cat, idx) {
                database[cat][idx].isVIP = !database[cat][idx].isVIP;
                saveAdminChanges();
                renderAdmTable();
                syncUI();
            }

            function admToggleStock(cat, index) {
                database[cat][index].inStock = !(database[cat][index].inStock !== false);
                saveAdminChanges();
                renderAdmTable();
                syncUI();
            }

            function admDeleteProduct(cat, index) {
                if (!confirm('ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ظ‡ط°ط§ ط§ظ„ظ…ظ†طھط¬طں')) return;
                database[cat].splice(index, 1);
                saveAdminChanges();
                renderAdmTable();
                syncUI();
            }

            function admSaveSettings() {
                const wa = document.getElementById('adm-wa-num').value;
                const ticker = document.getElementById('adm-ticker-text').value;
                if (!wa) return alert("ظٹط±ط¬ظ‰ ط¥ط¯ط®ط§ظ„ ط±ظ‚ظ… ظˆط§طھط³ط§ط¨");
                database.settings.whatsapp = wa;
                database.settings.ticker = ticker;
                WHATSAPP_NUM = wa;
                TICKER_TEXT = ticker;
                const tickerEl = document.querySelector('.ticker');
                if (tickerEl) tickerEl.innerText = ticker;
                saveAdminChanges();
                alert("âœ… طھظ… ط­ظپط¸ ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ ط¨ظ†ط¬ط§ط­");
            }

            function renderAdmVouchers() {
                const list = document.getElementById('adm-vouchers-list');
                const v = database.vouchers || {};
                list.innerHTML = Object.entries(v).map(([code, perc]) => `
                <div style="background:#e0f2fe; padding:5px 10px; border-radius:15px; display:flex; gap:8px; align-items:center; font-size:0.85rem;">
                    <b>${code}</b> (${perc * 100}%)
                    <button onclick="admRemoveVoucher('${code}')" style="border:none; background:none; color:red; cursor:pointer;">âœ–</button>
                </div>
            `).join('');
            }

            function admAddVoucher() {
                const code = document.getElementById('adm-v-code').value.toUpperCase();
                const perc = parseFloat(document.getElementById('adm-v-perc').value) / 100;
                if (!code || isNaN(perc)) return alert("ظٹط±ط¬ظ‰ ط¥ط¯ط®ط§ظ„ ط¨ظٹط§ظ†ط§طھ طµط­ظٹط­ط©");
                database.vouchers[code] = perc;
                saveAdminChanges();
                renderAdmVouchers();
                document.getElementById('adm-v-code').value = '';
                document.getElementById('adm-v-perc').value = '';
            }

            function admRemoveVoucher(code) {
                delete database.vouchers[code];
                saveAdminChanges();
                renderAdmVouchers();
            }

            function renderAdmAreas() {
                const list = document.getElementById('adm-areas-list');
                const areas = database.delivery || [];
                list.innerHTML = areas.map((a, i) => `
                <div style="background:#fef3c7; padding:5px 10px; border-radius:15px; display:flex; gap:8px; align-items:center; font-size:0.85rem;">
                    <b>${a.name}</b> (${a.price}ط¬)
                    <button onclick="admRemoveArea(${i})" style="border:none; background:none; color:red; cursor:pointer;">âœ–</button>
                </div>
            `).join('');

                // Update the actual select in cart
                const select = document.getElementById('area-select');
                if (select) {
                    select.innerHTML = areas.map(a => `<option value="${a.price}">${a.name}</option>`).join('');
                }
            }

            function admAddArea() {
                const name = document.getElementById('adm-area-name').value;
                const price = parseInt(document.getElementById('adm-area-price').value);
                if (!name || isNaN(price)) return alert("ظٹط±ط¬ظ‰ ط¥ط¯ط®ط§ظ„ ط¨ظٹط§ظ†ط§طھ طµط­ظٹط­ط©");
                database.delivery.push({ name, price });
                saveAdminChanges();
                renderAdmAreas();
                document.getElementById('adm-area-name').value = '';
                document.getElementById('adm-area-price').value = '';
            }

            function admRemoveArea(i) {
                database.delivery.splice(i, 1);
                saveAdminChanges();
                renderAdmAreas();
            }

            function admToggleDiscount(cat, index) {
                database[cat][index].isDiscount = !database[cat][index].isDiscount;
                saveAdminChanges();
                renderAdmTable();
                syncUI();
            }

            function admAddProduct() {
                const cat = document.getElementById('adm-cat').value;
                const name = document.getElementById('adm-name').value;
                const price = parseFloat(document.getElementById('adm-price').value);
                const oldPriceValue = document.getElementById('adm-old-price').value;
                const oldPrice = oldPriceValue ? parseFloat(oldPriceValue) : null;
                const type = document.getElementById('adm-type').value;
                const optionsStr = document.getElementById('adm-type-custom').value;
                const img = document.getElementById('adm-img').value;
                const editIndex = parseInt(document.getElementById('adm-edit-mode-index').value);

                if (!name || isNaN(price)) return alert('ظٹط±ط¬ظ‰ ط¥ظƒظ…ط§ظ„ ط§ظ„ط¨ظٹط§ظ†ط§طھ');

                const options = optionsStr ? optionsStr.split('\n').map(s => s.trim()).filter(s => s) : null;

                if (editIndex >= 0) {
                    // Update Existing
                    const p = database[cat][editIndex];
                    p.name = name;
                    p.price = price;
                    p.oldPrice = oldPrice;
                    p.type = type;
                    p.options = options;
                    p.img = img;
                    alert("âœ… طھظ… طھط¹ط¯ظٹظ„ ط§ظ„ظ…ظ†طھط¬ ط¨ظ†ط¬ط§ط­");
                } else {
                    // Add New
                    const newP = { name, price, oldPrice, type, options, img: img || "", inStock: true, isDiscount: false, isVIP: false };
                    if (!database[cat]) database[cat] = [];
                    database[cat].unshift(newP);
                    alert("âœ… طھظ… ط¥ط¶ط§ظپط© ط§ظ„ظ…ظ†طھط¬ ط¨ظ†ط¬ط§ط­");
                }

                saveAdminChanges();
                admCancelEdit(); // Reset form
                renderAdmTable();
                syncUI();
            }

            function admEditProduct(cat, index) {
                const p = database[cat][index];
                if (!p) return;

                document.getElementById('adm-cat').value = cat;
                document.getElementById('adm-cat').disabled = true;
                document.getElementById('adm-name').value = p.name;
                document.getElementById('adm-price').value = p.price;
                document.getElementById('adm-old-price').value = p.oldPrice || '';
                document.getElementById('adm-type').value = p.type;
                document.getElementById('adm-type-custom').value = p.options ? p.options.join('\n') : '';
                document.getElementById('adm-img').value = p.img || '';

                document.getElementById('adm-edit-mode-index').value = index;
                document.getElementById('adm-action-btn').innerText = "ط­ظپط¸ ط§ظ„طھط¹ط¯ظٹظ„ط§طھ ًں’¾";
                document.getElementById('adm-action-btn').style.background = "#2196f3";
                document.getElementById('adm-cancel-edit-btn').style.display = "inline-block";

                // Scroll to form
                document.querySelector('.admin-section').scrollIntoView({ behavior: 'smooth' });
            }

            function admCancelEdit() {
                document.getElementById('adm-cat').disabled = false;
                document.getElementById('adm-name').value = '';
                document.getElementById('adm-price').value = '';
                document.getElementById('adm-old-price').value = '';
                document.getElementById('adm-type-custom').value = '';
                document.getElementById('adm-img').value = '';
                document.getElementById('adm-edit-mode-index').value = '-1';

                const btn = document.getElementById('adm-action-btn');
                btn.innerText = "ط¥ط¶ط§ظپط© ط§ظ„ظ…ظ†طھط¬";
                btn.style.background = "var(--primary)";
                document.getElementById('adm-cancel-edit-btn').style.display = "none";
            }

            function admUpdateOptions(cat, index, val) {
                database[cat][index].options = val ? val.split('\n').map(s => s.trim()).filter(s => s) : null;
                saveAdminChanges();
                syncUI();
            }

            function admUpdateOldPrice(cat, index, val) {
                const v = parseFloat(val);
                database[cat][index].oldPrice = isNaN(v) ? null : v;
                saveAdminChanges();
                syncUI();
            }

            function admUpdateCurrentPrice(cat, index, val) {
                const v = parseFloat(val);
                if (!isNaN(v)) {
                    database[cat][index].price = v;
                    saveAdminChanges();
                    syncUI();
                }
            }

            // --- Category Management ---
            function renderCategories() {
                const container = document.getElementById('category-tabs-container');
                if (!container) return;
                container.innerHTML = (database.categories || []).map(c => `
                <button class="tab ${c.id === currentCat ? 'active' : ''}" onclick="render('${c.id}', this)">${c.name}</button>
            `).join('');
            }

            function renderAdmCategoriesList() {
                const list = document.getElementById('adm-cats-list');
                if (!list) return;
                list.innerHTML = (database.categories || []).map((c, i) => `
                <div style="background:#e0f2fe; padding:5px 10px; border-radius:15px; display:flex; gap:8px; align-items:center; font-size:0.85rem;">
                    <b>${c.name}</b>
                    ${['oriental', 'nabulsia', 'dairy', 'jordanian', 'Westernsweets', 'offers', 'drinks'].includes(c.id) ? '' : `<button onclick="admDeleteCategory(${i})" style="border:none; background:none; color:red; cursor:pointer;">âœ–</button>`}
                </div>
            `).join('');

                // Update Admin Select
                const sel = document.getElementById('adm-cat');
                if (sel) {
                    sel.innerHTML = (database.categories || []).map(c => `<option value="${c.id}" ${c.id === admCurrentCat ? 'selected' : ''}>${c.name}</option>`).join('');
                }
            }

            function admAddCategory() {
                const name = document.getElementById('adm-new-cat-name').value;
                const id = document.getElementById('adm-new-cat-id').value.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (!name || !id) return alert("ظٹط±ط¬ظ‰ ط¥ط¯ط®ط§ظ„ ط§ط³ظ… ظˆظƒظˆط¯ طµط­ظٹط­ ظ„ظ„ظ‚ط³ظ…");
                if (database.categories.find(c => c.id === id)) return alert("ظ‡ط°ط§ ط§ظ„ظƒظˆط¯ ظ…ط³طھط®ط¯ظ… ط¨ط§ظ„ظپط¹ظ„");

                database.categories.push({ id, name });
                database[id] = []; // Initialize empty array for products
                saveAdminChanges();
                document.getElementById('adm-new-cat-name').value = '';
                document.getElementById('adm-new-cat-id').value = '';
                syncUI();
                alert("âœ… طھظ… ط¥ط¶ط§ظپط© ط§ظ„ظ‚ط³ظ… ط¨ظ†ط¬ط§ط­");
            }

            function admDeleteCategory(index) {
                const cat = database.categories[index];
                if (!cat) return;
                if (confirm(`ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ظ‚ط³ظ… "${cat.name}" ظˆظƒظ„ ط§ظ„ظ…ظ†طھط¬ط§طھ ط¨ط¯ط§ط®ظ„ظ‡طں`)) {
                    delete database[cat.id]; // Remove products
                    database.categories.splice(index, 1);
                    // Reset current cat if deleted
                    if (currentCat === cat.id) currentCat = database.categories[0].id;
                    if (admCurrentCat === cat.id) admCurrentCat = database.categories[0].id;

                    saveAdminChanges();
                    document.getElementById('stat-revenue').innerText = database.stats.totalRevenue.toFixed(0) + " ط¬";

                    // Top 5 Products by volume (simulated as we don't have order details history, but we can show products with isBestSeller for now)
                    let best = [];
                    for (let cat in database) {
                        if (Array.isArray(database[cat])) {
                            database[cat].forEach(p => { if (p.isBestSeller) best.push(p.name); });
                        }
                    }
                    const topList = best.slice(0, 5).join(', ') || 'ظ„ط§ ظٹظˆط¬ط¯ ط­ط§ظ„ظٹط§ظ‹';
                    const revenueCard = document.querySelector('.admin-stats-bar');
                    if (revenueCard && !document.getElementById('top-products-stat')) {
                        const topDiv = document.createElement('div');
                        topDiv.id = 'top-products-stat';
                        topDiv.className = 'stat-card';
                        topDiv.style.gridColumn = '1 / -1';
                        topDiv.style.marginTop = '10px';
                        topDiv.innerHTML = `<p style="font-size:0.8rem; color:#666;">ط§ظ„ط£ظƒط«ط± طھظ…ظٹط²ط§ظ‹ ًں”¥</p><div class="stat-val" style="font-size:1.1rem; color:var(--gold);">${topList}</div>`;
                        revenueCard.appendChild(topDiv);
                    } else if (document.getElementById('top-products-stat')) {
                        document.getElementById('top-products-stat').querySelector('.stat-val').innerText = topList;
                    }
                }
            }

            function toggleRamadanMode() {
                isRamadanMode = !isRamadanMode;
                // Save to database for cloud sync
                if (!database.settings) database.settings = {};
                database.settings.isRamadanMode = isRamadanMode;
                saveAdminChanges();
                document.getElementById('ramadan-toggle-btn').innerText = isRamadanMode ? "ط¥ط¨ط·ط§ظ„" : "طھظپط¹ظٹظ„";
                document.body.classList.toggle('ramadan-mode', isRamadanMode);
                syncUI();
            }

            function admAddGallery() {
                const url = document.getElementById('adm-gallery-url').value;
                if (!url) return;
                database.gallery.push(url);
                document.getElementById('adm-gallery-url').value = '';
                saveAdminChanges();
                renderAdmGallery();
                syncUI();
            }

            function admDeleteGallery(i) {
                database.gallery.splice(i, 1);
                saveAdminChanges();
                renderAdmGallery();
                syncUI();
            }

            function renderAdmGallery() {
                const list = document.getElementById('adm-gallery-list');
                if (list) {
                    list.innerHTML = (database.gallery || []).map((url, i) => `
            <div style="position:relative; flex-shrink:0;">
                <img src="${url}" style="width:50px; height:50px; object-fit:cover; border-radius:5px;">
                    <button onclick="admDeleteGallery(${i})" style="position:absolute; top:0; right:0; background:red; color:white; border:none; border-radius:50%; width:18px; height:18px; cursor:pointer; font-size:10px;">أ—</button>
                </div>
        `).join('');
                }
            }

            function renderGallery() {
                const cont = document.getElementById('customer-gallery');
                if (cont) {
                    cont.innerHTML = (database.gallery || []).map(url => `
            <div class="gallery-item animate__animated animate__zoomIn">
                <img src="${url}" loading="lazy">
                </div>
        `).join('');
                }
            }

            function admToggleBestSeller(cat, index) {
                database[cat][index].isBestSeller = !database[cat][index].isBestSeller;
                saveAdminChanges();
                renderAdmTable();
                syncUI();
            }

            function admToggleVIP(cat, index) {
                database[cat][index].isVIP = !database[cat][index].isVIP;
                saveAdminChanges();
                renderAdmTable();
                syncUI();
            }

            function renderBestSellers() {
                let all = [];
                for (let cat in database) {
                    if (Array.isArray(database[cat])) {
                        database[cat].forEach(p => { if (p.isBestSeller) all.push(p); });
                    }
                }
                const sec = document.getElementById('best-sellers-section');
                if (all.length > 0) {
                    sec.classList.remove('hidden');
                    const uploadedImages = database.uploadedImages || {};
                    document.getElementById('best-sellers-grid').innerHTML = all.map(p => {
                        // Check if image exists in uploaded images or use placeholder
                        let imgSrc = p.img || 'https://via.placeholder.com/80';
                        if (p.img && uploadedImages[p.img]) {
                            imgSrc = uploadedImages[p.img];
                        }
                        return `
            <div class="best-seller-item" onclick="showMenu(); document.querySelector('.search-bar').value='${p.name}'; searchProducts('${p.name}')">
                <img src="${imgSrc}">
                    <p style="font-size:0.8rem; margin-top:5px; font-weight:bold;">${p.name}</p>
                </div>
                `;
                    }).join('');
                } else {
                    sec.classList.add('hidden');
                }
            }

            function admToggleStock(cat, index) {
                database[cat][index].inStock = !(database[cat][index].inStock !== false);
                saveAdminChanges();
                renderAdmTable();
                syncUI();
            }

            function admDeleteProduct(cat, index) {
                if (!confirm('ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ظ‡ط°ط§ ط§ظ„ظ…ظ†طھط¬طں')) return;
                database[cat].splice(index, 1);
                saveAdminChanges();
                renderAdmTable();
                syncUI();
            }

            // --- Order History & Receipts ---
            function renderAdmOrders() {
                const list = document.getElementById('adm-orders-list');
                if (!list) return;
                const orders = (database.orders || []).slice().reverse().slice(0, 50); // Last 50

                list.innerHTML = orders.map(o => `
                <div class="order-history-item" style="background:${o.status === 'completed' ? '#e8f5e9' : '#fff3e0'}; padding:10px; border-radius:5px; margin-bottom:5px; border:1px solid #ddd;">
                    <div style="display:flex; justify-content:space-between;">
                        <b>#${o.id} - ${o.date}</b>
                        <span>${o.total} ط¬</span>
                    </div>
                    <div style="font-size:0.85rem; color:#666; margin-top:5px;">${o.items}</div>
                    <div style="margin-top:5px; display:flex; gap:5px;">
                        <button class="admin-btn" style="width:auto; padding:2px 8px; font-size:0.8rem;" onclick="admPrintReceipt('${o.id}')">ًں–¨ï¸ڈ ط·ط¨ط§ط¹ط©</button>
                    </div>
                </div>
            `).join('');
            }

            function admPrintReceipt(orderId) {
                const order = database.orders.find(o => o.id == orderId);
                if (!order) return;

                const receipt = document.getElementById('receipt-template');
                document.getElementById('rec-date').innerText = order.date;
                document.getElementById('rec-id').innerText = order.id;

                // Items
                // Assuming items string "falafel (2), hummus (1)" -> parse or save structured
                // For now just show string
                document.getElementById('rec-items').innerHTML = `<div style="border-bottom:1px dashed #000; padding:5px 0;">${order.items.replace(/,/g, '<br>')}</div>`;

                document.getElementById('rec-total').innerText = order.total + " EGP";

                const win = window.open('', '', 'width=300,height=600');
                win.document.write('<html><head><title>Receipt</title><style>body{font-family:monospace; direction:rtl; text-align:center;}</style></head><body>');
                win.document.write(receipt.innerHTML);
                win.document.write('</body></html>');
                win.document.close();
                win.focus();
                win.print();
                win.close();
            }

            // --- Mix Editor ---
            function renderAdmMixEditor() {
                const container = document.getElementById('adm-mix-editor');
                if (!container) return;

                // Find Mix Products
                let mixes = [];
                for (let c in database) {
                    if (Array.isArray(database[c])) {
                        database[c].forEach((p, i) => {
                            if (p.isMix) mixes.push({ cat: c, idx: i, ...p });
                        });
                    }
                }

                if (mixes.length === 0) {
                    container.innerHTML = "<p>ظ„ط§ طھظˆط¬ط¯ ظ…ظ†طھط¬ط§طھ 'ظ…ظƒط³' ط­ط§ظ„ظٹط§ظ‹.</p>";
                    return;
                }

                container.innerHTML = mixes.map(m => `
                <div style="border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:10px;">
                    <b>${m.title}</b>
                    <textarea id="mix-content-${m.cat}-${m.idx}" style="width:100%; height:80px; margin-top:5px; border:1px solid #ddd;" placeholder="ظ…ظƒظˆظ†ط§طھ ط§ظ„ظ…ظƒط³ (ظƒظ„ ط³ط·ط± ظ…ظƒظˆظ†)">${(m.contents || []).join('\n')}</textarea>
                    <button class="admin-btn" style="width:auto; margin-top:5px;" onclick="admSaveMixContents('${m.cat}', ${m.idx}, document.getElementById('mix-content-${m.cat}-${m.idx}').value)">ط­ظپط¸ ط§ظ„ظ…ط­طھظˆظٹط§طھ</button>
                </div>
            `).join('');
            }

            function admSaveMixContents(cat, idx, val) {
                const contents = val ? val.split('\n').filter(x => x.trim()).map(x => x.trim()) : null;
                database[cat][idx].contents = contents;
                saveAdminChanges();
                alert("âœ… طھظ… ط­ظپط¸ ظ…ط­طھظˆظٹط§طھ ط§ظ„ظ…ظƒط³");
                syncUI();
            }

            function saveAdminChanges() {
                localStorage.setItem('oudelle_custom_database', JSON.stringify(database));

                // Real-time sync for all connected clients
                if (isCloudActive && db) {
                    db.collection('app').doc('data').set(database).then(() => {
                        console.log("ًں”¥ Changes synced to cloud");
                    }).catch((error) => {
                        console.error("â‌Œ Cloud sync error:", error);
                    });
                }
            }

            // --- Image Upload Functions ---
            function handleHomeBgUpload(event) {
                const file = event.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    compressImage(file, 1024, 0.8).then(dataUrl => {
                        // Save to database for sync
                        if (!database.settings) database.settings = {};
                        database.settings.homeBackground = dataUrl;
                        saveAdminChanges();
                        // Apply immediately - replace background entirely
                        const sliderBg = document.getElementById('slider-bg');
                        sliderBg.style.background = `url(${dataUrl}) center center / cover no-repeat`;
                        // Show preview
                        document.getElementById('home-bg-preview').innerHTML =
                            `<img src="${dataUrl}" style="max-width:200px; max-height:150px; border-radius:10px; border:2px solid var(--gold);">
                         <p style="margin-top:5px; color:green;">âœ… طھظ… طھط­ط¯ظٹط« طµظˆط±ط© ط§ظ„ط®ظ„ظپظٹط© ظˆظ…ط²ط§ظ…ظ†طھظ‡ط§</p>`;
                    }).catch(err => {
                        console.error("Compression error:", err);
                        alert("ط­ط¯ط« ط®ط·ط£ ط£ط«ظ†ط§ط، ظ…ط¹ط§ظ„ط¬ط© ط§ظ„طµظˆط±ط©. ظٹط±ط¬ظ‰ ط§ظ„ظ…ط­ط§ظˆظ„ط© ظ…ط±ط© ط£ط®ط±ظ‰.");
                    });
                }
            }

            function handleProductImgUpload(event) {
                const file = event.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    compressImage(file, 600, 0.7).then(dataUrl => {
                        // Generate unique filename
                        const fileName = 'product_' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                        // Save to database for sync
                        if (!database.uploadedImages) database.uploadedImages = {};
                        database.uploadedImages[fileName] = dataUrl;
                        saveAdminChanges();
                        // Auto-fill the image input
                        document.getElementById('adm-img').value = fileName;
                        alert('âœ… طھظ… ط±ظپط¹ ط§ظ„طµظˆط±ط© ظˆظ…ط²ط§ظ…ظ†طھظ‡ط§ ط¨ظ†ط¬ط§ط­!');
                    }).catch(err => {
                        console.error("Compression error:", err);
                        alert("ط­ط¯ط« ط®ط·ط£ ط£ط«ظ†ط§ط، ظ…ط¹ط§ظ„ط¬ط© ط§ظ„طµظˆط±ط©. ظٹط±ط¬ظ‰ ط§ظ„ظ…ط­ط§ظˆظ„ط© ظ…ط±ط© ط£ط®ط±ظ‰.");
                    });
                }
            }

            // Load saved home background on page load
            window.addEventListener('load', function () {
                // Load from database first
                if (database.settings && database.settings.homeBackground) {
                    const sliderBg = document.getElementById('slider-bg');
                    sliderBg.style.background = `url(${database.settings.homeBackground}) center center / cover no-repeat`;
                }
                // Fallback to localStorage
                const savedBg = localStorage.getItem('oudelle_home_bg');
                if (savedBg) {
                    const sliderBg = document.getElementById('slider-bg');
                    sliderBg.style.background = `url(${savedBg}) center center / cover no-repeat`;
                }
            });

            // Sync images from database to localStorage on load
            function syncImagesFromDatabase() {
                // Sync gallery images
                if (database.gallery && database.gallery.length > 0) {
                    localStorage.setItem('oudelle_gallery_images', JSON.stringify(database.gallery));
                    console.log('ًں–¼ï¸ڈ Gallery images synced to localStorage');
                }

                // Sync uploaded images
                if (database.uploadedImages) {
                    localStorage.setItem('oudelle_uploaded_images', JSON.stringify(database.uploadedImages));
                    console.log('ًں“¸ Product images synced to localStorage');
                }
            }

            // Call sync on load
            document.addEventListener('DOMContentLoaded', function () {
                syncImagesFromDatabase();
                setTimeout(function () {
                    console.log('ًںڑ€ Initializing app...');
                    ensureDefaults();
                    renderCategories();
                    render(currentCat);
                    renderBestSellers();
                    renderGallery();
                    syncUI();

                    // Apply Ramadan mode from database
                    if (database.settings && database.settings.isRamadanMode !== undefined) {
                        isRamadanMode = database.settings.isRamadanMode;
                        localStorage.setItem('oudelle_ramadan', isRamadanMode);
                        document.body.classList.toggle('ramadan-mode', isRamadanMode);
                        const btn = document.getElementById('ramadan-toggle-btn');
                        if (btn) btn.innerText = isRamadanMode ? "ط¥ط¨ط·ط§ظ„" : "طھظپط¹ظٹظ„";
                    }

                    // Apply home background from database
                    if (database.settings && database.settings.homeBackground) {
                        const sliderBg = document.getElementById('slider-bg');
                        sliderBg.style.background = `url(${database.settings.homeBackground}) center center / cover no-repeat`;
                    }

                    console.log('âœ… App initialized!');
                    console.log('? App initialized!');
                }, 200);
            });

