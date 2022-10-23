/**
 * run `node solution.js`
 */
const transactions = [
    {
        "id": 3,
        "sourceAccount": "A",
        "targetAccount": "B",
        "amount": 100,
        "category": "eating_out",
        "time": "2018-03-02T10:34:30.000Z"
    },
    {
        "id": 1,
        "sourceAccount": "A",
        "targetAccount": "B",
        "amount": 100,
        "category": "eating_out",
        "time": "2018-03-02T10:33:00.000Z"
    },
    {
        "id": 6,
        "sourceAccount": "A",
        "targetAccount": "C",
        "amount": 250,
        "category": "other",
        "time": "2018-03-02T10:33:05.000Z"
    },
    {
        "id": 7,
        "sourceAccount": "A",
        "targetAccount": "B",
        "amount": 100,
        "category": "eating_out",
        "time": "2018-03-02T10:38:05.000Z"
    },
    {
        "id": 4,
        "sourceAccount": "A",
        "targetAccount": "B",
        "amount": 100,
        "category": "eating_out",
        "time": "2018-03-02T10:36:00.000Z"
    },
    {
        "id": 8,
        "sourceAccount": "A",
        "targetAccount": "B",
        "amount": 100,
        "category": "eating_out",
        "time": "2018-03-02T10:38:10.000Z"
    },
    {
        "id": 2,
        "sourceAccount": "A",
        "targetAccount": "B",
        "amount": 100,
        "category": "eating_out",
        "time": "2018-03-02T10:33:50.000Z"
    },
    {
        "id": 5,
        "sourceAccount": "A",
        "targetAccount": "C",
        "amount": 250,
        "category": "other",
        "time": "2018-03-02T10:33:00.000Z"
    }
];

myMap = {};

// iterates a list of transactions and returns all the transactions that
// are duplicates - i.e. transaction with same category, source, target, and amount 
// happening within in a minutes

// Assumes that the id within a duplicates group increments with time
function sortTransactions() {
    transactions.sort((a, b) => a.id - b.id);
    // PHASE 1 - Grouping
    transactions.forEach((item) => {
        const key = `${item.category}-${item.sourceAccount}-${item.targetAccount}-${item.amount}`;
        const list = myMap[key];
        console.log(item.id);
        if (!list) {
            myMap[key] = [item];
        } else {
            list.push(item);
        }
    });
    console.log(myMap);
    console.log("\n\n");


    // PHASE 2 - Identifying duplicates in each group
    duplicatesGroup = [];
    Object.values(myMap).forEach(list => {
        duplicates = [];
        found = false;
        for (let i = 0; i < list.length - 1; i++) {
            const nextTxTime = Date.parse(list[i + 1].time);
            const currTxTime = Date.parse(list[i].time);
            if (nextTxTime - currTxTime < 1 * 60 * 1000) {
                duplicates.push(list[i]);
                found = true;
            } else {
                if (found == true) {
                    duplicates.push(list[i]);
                }
                found = false;
            }
        }
        if (found) {
            duplicates.push(list[list.length - 1]);
        }
        duplicatesGroup.push(duplicates);
    })
    return duplicatesGroup;
}

console.log(sortTransactions());


// Note on Time Complexity
/**
 * Given n transactions
 * Firstly, sort them, so assuming worst case and worst algorithm it is n^2 and a better algorithm it
 * is n*log(n). A counting sort type alogrithm will not work as the comparison digit will be in range of 
 * 1 - n so we will get O(n^2).
 * 
 * Secondly, we iterate n times to organise into groups.
 * 
 * Then we iterate k groups * l#k elements per group to find duplicates. This is also equal to n elements.
 * 
 * In total it could be n*log(n) + n + n ==> O(n*log(n)) OR O(n^2) It all comes to down to how we sort this list.
 * 
 * In real life we maybe getting these transactions in a stream rather than as a fixed list that we
 * can process in one go. So we may have to take a different approach.
 */